import { useRef, useState } from 'react';
import useChatStore from '../store/chatStore';
import type { Message } from '../interfaces/message';
import { Modal } from '../UI-Component/Modal';
import { toast } from 'react-toastify';
import { BsThreeDotsVertical } from 'react-icons/bs';
type MessageProps = {
  message: Message;
  isMine: boolean;
};

export default function MessageItem({ message, isMine }: MessageProps) {
  const { loading, updateMessageById, deleteMessageById } = useChatStore();
  const [showMenu, setShowMenu] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleEditMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get('text') as string;
    const file = fileRef.current?.files?.[0];
    if (file) {
      formData.append('file', file);
    }
    if (!text && !file) {
      toast.error('Text or file is required');
      return;
    }
    setOpenEditModal(false);
    updateMessageById(message._id, formData);
    setPreview(null);
    toast.success('Message updated');
  };
  const handleDeleteMessage = async () => {
    await deleteMessageById(message._id);
    setOpenDeleteModal(false);
    toast.success('Message deleted');
  };

  return (
    <>
      <div className="flex justify-start flex-col gap-1 ">
        <div
          className={`w-3/4 flex p-2 mb-2 px-3.5 py-3 shadow-sm relative corsor-pointer ${
            isMine
              ? 'bg-indigo-400 text-white self-end rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl'
              : 'bg-slate-200 text-gray-700 self-start rounded-bl-2xl rounded-tr-2xl rounded-br-2xl'
          }`}
        >
          {message.text && <p>{message.text}</p>}
          {message.fileUrl && (
            <img
              src={message.fileUrl}
              alt="file"
              className="mt-2 max-w-24 max-h-24 rounded"
            />
          )}
          <div className="flex flex-nowrap gap-2 absolute bottom-2 right-3 justify-end">
            <p className="text-xs">
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            {isMine && (
              <button onClick={() => setShowMenu((v) => !v)} className="">
                <BsThreeDotsVertical />
              </button>
            )}
          </div>
          {showMenu && (
            <div className="absolute top-8 right-2 bg-white text-gray-700 shadow-md rounded-md text-sm z-10 flex flex-nowrap">
              <button
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left hover:rounded-l-md"
                onClick={() => {
                  setOpenEditModal(true);
                  setShowMenu(false);
                }}
              >
                ✏️
              </button>
              <button
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-red-500 hover:rounded-r-md"
                onClick={() => {
                  setOpenDeleteModal(true);
                  setShowMenu(false);
                }}
              >
                🗑
              </button>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <h2 className="text-lg font-semibold mb-10 text-center text-slate-800">
          Are you sure you want to delete this message?
        </h2>
        <div className="flex justify-center gap-4 mt-7">
          <button
            className="px-4 py-2 border border-slate-400 rounded text-slate-500"
            onClick={() => setOpenDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 border border-red-500 rounded text-red-500"
            onClick={handleDeleteMessage}
          >
            Delete
          </button>
        </div>
      </Modal>
      {/* Modal for  editig message */}
      <Modal isOpen={openEditModal} onClose={() => setOpenEditModal(false)}>
        <h2 className="text-lg font-semibold mb-12 text-center text-slate-800">
          Update contact
        </h2>
        <form
          className="flex flex-col gap-2.5 mt-4 py-2"
          onSubmit={handleEditMessage}
        >
          <input
            name="text"
            defaultValue={message.text}
            className="w-full outline-none bg-indigo-500/10 py-2.5 px-3 text-gray-600 rounded"
            type="text"
            placeholder="Text"
          />
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
          />

          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="px-3 py-2 bg-gray-200 rounded"
          >
            Select Image
          </button>
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-2 max-w-48 max-h-48 rounded object-cover mx-auto"
            />
          )}
          <div className="grid grid-cols-2 gap-4 mt-7">
            <button
              className="px-4 py-2 border border-slate-400 rounded text-slate-500 cursor-pointer hover:bg-slate-400/30"
              onClick={() => setOpenEditModal(false)}
            >
              Close
            </button>
            <button className="px-4 py-2 bg-indigo-500 text-white rounded cursor-pointer hover:bg-indigo-600 border-none">
              {loading ? 'Loading...' : 'Save'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
