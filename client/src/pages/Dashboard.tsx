import ChatBox from '../components/ChatBox';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  return (
    <div className="bg-[url('./assets/images/mess.png')] bg-cover bg-center bg-no-repeat min-h-screen flex justify-center md:py-10">
      <div className="bg-white w-full h-screen md:h-[85vh] md:w-[90vw] grid md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-4 rounded-none md:rounded-2xl opacity-100 shadow-2xl ring-1 ring-white/60 relative">
        <aside className="h-full flex flex-col justify-between md:col-span-2 lg:col-span-2 xl:col-span-1">
          <Sidebar />
        </aside>
        <main className="md:col-span-3 lg:col-span-3 xl:col-span-3 relative ">
          <ChatBox />
        </main>
      </div>
    </div>
  );
}
