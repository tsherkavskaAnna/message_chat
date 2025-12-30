import useChatStore from '../store/chatStore';
import ActiveContact from './ActiveContact';
import MessagesSection from './MessagesSection';
import ResponseMessSection from './ResponseMessSection';

export default function ChatBox() {
  const { activeContactId } = useChatStore();

  // 👉 nessun contatto selezionato
  if (!activeContactId) {
    return (
      <div
        className="hidden md:flex h-full items-center justify-center
        bg-[url('./assets/images/bg-chat.png')] bg-cover bg-center opacity-40"
      ></div>
    );
  }

  return (
    <div
      className={`bg-white flex flex-col h-full md:relative fixed inset-0 z-30 md:z-auto`}
    >
      <div className="h-24 border-b border-slate-300 p-4">
        <ActiveContact />
      </div>
      <div className="flex-1 overflow-y-auto">
        <MessagesSection />
      </div>
      <div className="border-t border-slate-300 p-2 md:p-4">
        <ResponseMessSection />
      </div>
    </div>
  );
}
