import { useEffect, useRef } from 'react';
import useAuthStore from '../store/authStore';
import useChatStore from '../store/chatStore';
import useContactsStore from '../store/contactsStore';
import notification from '../assets/sounds/message.mp3';
import MessageItem from './MessageItem';

export default function MessagesSection() {
  const { activeContactId, messages } = useChatStore();
  const { contacts } = useContactsStore();
  const { user } = useAuthStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const soundRef = useRef<HTMLAudioElement>(new Audio(notification));

  const activeContact = contacts.find((c) => c._id === activeContactId);
  const myId = user?.id;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    const lastMessage = messages[messages.length - 1];

    if (lastMessage && lastMessage.senderId !== myId) {
      soundRef.current.play();
      soundRef.current.volume = 0.5;
      soundRef.current.play().catch(() => {});
    }
  }, [messages, myId]);

  if (!activeContact) {
    return (
      <div className="h-full bg-[url('./assets/images/bg-chat.png')] bg-cover bg-center bg-no-repeat opacity-50"></div>
    );
  }

  return (
    <div className="p-4 overflow-y-auto max-h-[calc(90vh-16rem)]">
      {messages.map((message) => (
        <MessageItem
          key={message._id}
          message={message}
          isMine={message.senderId === myId}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
