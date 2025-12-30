import useChatStore from '../store/chatStore';
import useContactsStore from '../store/contactsStore';
import Logo from '../assets/icons/logo-chat.png';
import { MdDelete } from 'react-icons/md';
import { FaUserPen } from 'react-icons/fa6';
import { BiExit } from 'react-icons/bi';

import { MdArrowBackIosNew } from 'react-icons/md';
import { DropdownMenu } from '../UI-Component/DropdownMenu';
import { Modal } from '../UI-Component/Modal';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function ActiveContact() {
  const { activeContactId, clearChat } = useChatStore();
  const { contacts, loading, updateContact, removeContact } =
    useContactsStore();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const activeContact = contacts.find((c) => c._id === activeContactId);

  if (!activeContact) {
    return (
      <div className="flex items-center justify-center h-full">
        <h2 className="text-indigo-600">Select a contact for</h2>
        <img src={Logo} alt="logo" className="w-18 h-18 object-contain" />
      </div>
    );
  }

  const handleUpdateContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setOpenEditModal(false);
    updateContact(activeContact._id, formData);
    toast.success('Contact updated');
  };

  const handleDeleteContact = () => {
    removeContact(activeContact._id);
    setOpenDeleteModal(false);
    toast.success('Contact deleted');
  };

  const items = [
    {
      title: 'Update contact',
      action: () => {
        setOpenEditModal(true);
      },
      icon: (
        <FaUserPen style={{ width: '24px', height: '24px', color: 'blue' }} />
      ),
    },
    {
      title: 'Leave chat',
      action: clearChat,
      icon: <BiExit style={{ width: '24px', height: '24px', color: 'blue' }} />,
    },
    {
      title: 'Delete contact',
      action: () => setOpenDeleteModal(true),
      icon: (
        <MdDelete style={{ width: '24px', height: '24px', color: 'red' }} />
      ),
    },
  ];
  return (
    <div className="flex items-center h-full text-slate-500 md:gap-4 md:justify-between justify-around">
      <button className="md:hidden text-indigo-500" onClick={clearChat}>
        <MdArrowBackIosNew style={{ width: '24px', height: '24px' }} />
      </button>
      <div className="flex flex-nowrap justify-center items-center gap-2 md:gap-6">
        <img
          src={activeContact.image}
          alt="avatar"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold text-indigo-600 mb-2">
            {activeContact.username}
          </h2>
          <p className="text-sm ">{activeContact.email}</p>
        </div>
      </div>
      <DropdownMenu buttonLabel="" items={items} />
      {/* Modal per conferma di eliminare contatto */}
      <Modal isOpen={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <h2 className="text-lg font-semibold mb-10 text-center text-slate-800">
          Are you sure you want to delete this contact?
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
            onClick={handleDeleteContact}
          >
            Delete
          </button>
        </div>
      </Modal>
      {/* Modal per modificare contatto */}
      <Modal isOpen={openEditModal} onClose={() => setOpenEditModal(false)}>
        <h2 className="text-lg font-semibold mb-12 text-center text-slate-800">
          Update contact
        </h2>
        <form
          className="flex flex-col gap-2.5 mt-4 py-2"
          onSubmit={handleUpdateContact}
        >
          <input
            name="fullName"
            defaultValue={activeContact.fullName}
            className="w-full outline-none bg-indigo-500/10 py-2.5 px-3 text-gray-600 rounded"
            type="text"
            placeholder="Full Name"
            required
          />
          <input
            name="username"
            defaultValue={activeContact.username}
            className="w-full outline-none bg-indigo-500/10 py-2.5 px-3 text-gray-600 rounded"
            type="text"
            placeholder="Username"
            required
          />
          <input
            name="email"
            defaultValue={activeContact.email}
            className="w-full outline-none bg-indigo-500/10 py-2.5 px-3 text-gray-600 rounded"
            type="email"
            placeholder="Email"
            required
          />

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
    </div>
  );
}
