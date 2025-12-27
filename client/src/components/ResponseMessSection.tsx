import useChatStore from '../store/chatStore';
import { IoSend } from 'react-icons/io5';
import { FaRegImage } from 'react-icons/fa6';
/* import { FaRegSmile } from 'react-icons/fa'; */

export default function ResponseMessSection() {
  const { sendMessageToContact } = useChatStore();

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await sendMessageToContact(formData);
  };
  return (
    <div className="px-4">
      <form
        onSubmit={handleSendMessage}
        className="flex justify-between items-center border-2 border-indigo-500 rounded-lg px-6 py-3 text-slate-500"
      >
        <div className="flex flex-nowrap gap-4">
          <button className="cursor-pointer">
            <FaRegImage size={24} color="#667eea" />
          </button>
          <input
            type="text"
            placeholder="Write your message..."
            className="outline-none"
          />
        </div>
        <button className="px-3 py-2 bg-indigo-500  flex items-center justify-center rounded cursor-pointer">
          <IoSend size={20} color="white" />
        </button>
      </form>
    </div>
  );
}
