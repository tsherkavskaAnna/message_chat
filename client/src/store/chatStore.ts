import { create } from 'zustand';
import {
  deleteMessage,
  getMessagesByContact,
  sendMessage,
  updateMessage,
} from '../actions/chatActions';
import { nanoid } from 'nanoid';
import { socket } from '../socket';

type Message = {
  _id: string;
  senderId: string;
  text?: string;
  fileUrl?: string;
  createdAt: Date;
  tempId?: string;
};

type ChatState = {
  activeContactId: string | null;
  messages: Message[];
  chatId: string | null;
  loading: boolean;
  openChat: (contactId: string) => Promise<void>;
  sendMessageToContact: (formData: FormData) => Promise<void>;
  updateMessageById: (messageId: string, formData: FormData) => Promise<void>;
  deleteMessageById: (messageId: string) => Promise<void>;
  clearChat: () => void;
};

let socketInitialized = false;

const useChatStore = create<ChatState>((set, get) => {
  if (!socketInitialized) {
    socket.on('receive_message', (message: Message) => {
      set((state) => {
        if (message.tempId) {
          return {
            messages: state.messages.map((m) =>
              m._id === message.tempId ? message : m
            ),
          };
        }
        if (state.messages.some((m) => m._id === message._id)) {
          return state;
        }

        return { messages: [...state.messages, message] };
      });
    });

    socketInitialized = true;
  }
  return {
    activeContactId: null,
    messages: [],
    loading: true,
    chatId: null,
    openChat: async (contactId: string) => {
      const previousChatId = get().chatId;
      if (previousChatId) socket.emit('leave_room', previousChatId);

      set({ loading: true, activeContactId: contactId });
      const data = await getMessagesByContact(contactId);
      set({
        messages: data.messages,
        chatId: data.chatId,
        loading: false,
      });
      socket.emit('join_room', data.chatId);
    },
    sendMessageToContact: async (formData) => {
      const contactId = get().activeContactId;
      const chatId = get().chatId;
      const tempId = nanoid();

      if (!contactId || !chatId) {
        return;
      }
      const textValue = String(formData.get('text') || '').trim();
      const fileValue = String(formData.get('file') || '').trim();

      if (!textValue && !fileValue) return;

      const optimisticMessage = {
        _id: tempId,
        senderId: 'me',
        text: textValue || undefined,
        fileUrl: fileValue || undefined,
        createdAt: new Date(),
      };
      set({
        messages: [...get().messages, optimisticMessage],
      });
      try {
        formData.append('tempId', tempId);
        await sendMessage(contactId, formData);
      } catch {
        set((state) => ({
          messages: state.messages.filter((m) => m._id !== tempId),
        }));
      }
    },
    updateMessageById: async (messageId, formData) => {
      const res = await updateMessage(messageId, formData);
      set((state) => ({
        messages: state.messages.map((m) =>
          m._id === messageId ? res.message : m
        ),
      }));
    },
    deleteMessageById: async (messageId) => {
      await deleteMessage(messageId);
      set((state) => ({
        messages: state.messages.filter((m) => m._id !== messageId),
      }));
    },
    clearChat: () => {
      const currentChatId = get().chatId;

      if (currentChatId) {
        socket.emit('leave_room', currentChatId);
      }

      set({
        activeContactId: null,
        chatId: null,
        messages: [],
      });
    },
  };
});

export default useChatStore;
