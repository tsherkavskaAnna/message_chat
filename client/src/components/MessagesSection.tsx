import useChatStore from '../store/chatStore';
import useContactsStore from '../store/contactsStore';

export default function MessagesSection() {
  const { activeContactId, messages } = useChatStore();
  const { contacts } = useContactsStore();

  const activeContact = contacts.find((c) => c._id === activeContactId);

  if (!activeContact) {
    return (
      <div className="flex items-center justify-center h-full bg-[url('./assets/images/bg-chat.png')] bg-cover bg-center bg-no-repeat opacity-50"></div>
    );
  }
  return (
    <div className="flex justify-start p-6">
      {messages.map((message) => (
        <div
          key={message._id}
          className=" bg-slate-200 w-3/4 p-2 rounded-bl-2xl rounded-tr-2xl  mb-2 px-3.5 py-3 shadow-sm"
        >
          <p className="text-gray-700">{message.text}</p>
        </div>
      ))}
    </div>
  );
}
