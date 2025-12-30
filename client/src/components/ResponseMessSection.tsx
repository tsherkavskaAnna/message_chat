import useChatStore from '../store/chatStore';
import { IoSend } from 'react-icons/io5';
import { FaRegImage } from 'react-icons/fa6';
import { useRef, useState } from 'react';
import { FaRegSmile } from 'react-icons/fa';
import EmojiPicker, { type EmojiClickData } from 'emoji-picker-react';

export default function ResponseMessSection() {
  const { sendMessageToContact } = useChatStore();
  const [text, setText] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', text);

    if (fileRef.current?.files?.[0]) {
      formData.append('file', fileRef.current.files[0]);
    }
    await sendMessageToContact(formData);
    if (fileRef.current) {
      fileRef.current.value = '';
    }
    setPreview(null);
    setText('');
  };
  return (
    <div className="px-4 md:relative ">
      {showEmojis && (
        <div className="absolute bottom-20 left-4 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <form
        onSubmit={handleSendMessage}
        className="flex justify-between items-center border-2 border-indigo-500 rounded-lg px-6 py-3 text-slate-500"
      >
        <div className="flex flex-nowrap gap-4">
          <button type="button" onClick={() => setShowEmojis(!showEmojis)}>
            <FaRegSmile size={22} color="#667eea" />
          </button>

          <button
            type="button"
            className="cursor-pointer"
            onClick={() => fileRef.current?.click()}
          >
            <FaRegImage size={24} color="#667eea" />
          </button>
          {preview && (
            <div className="mb-2">
              <img
                src={preview}
                alt="preview"
                className="w-24 h-24 object-cover rounded"
              />
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPreview(URL.createObjectURL(file));
              }
            }}
          />
          <input
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="text"
            placeholder=""
            className="outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(
                  e as unknown as React.FormEvent<HTMLFormElement>
                );
              }
            }}
          />
        </div>
        <button
          type="submit"
          className="px-3 py-2 bg-indigo-500 flex items-center justify-center rounded cursor-pointer absolute right-10 bottom-4 md:static"
        >
          <IoSend size={20} color="white" />
        </button>
      </form>
    </div>
  );
}
