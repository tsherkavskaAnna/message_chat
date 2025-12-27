import useAuthStore from '../store/authStore';
import AddNewContact from './AddNewContact';
import UserAvatar from './UserAvatar';
import UserLogout from './UserLogout';

export default function UserSection() {
  const { user } = useAuthStore();

  return (
    <div className="h-24 border-b-2 border-slate-300 px-2 py-3.5 bg- rounded-tl-2xl flex justify-between items-center bg-white">
      <div className="flex flex-nowrap items-center">
        <UserAvatar />
        <div className="flex flex-col ml-4">
          <h1 className="text-lg md:text-sm lg:text-lg font-semibold text-indigo-600">
            Welcome back
          </h1>
          <h2 className="text-sm text-slate-500">{user?.username}</h2>
        </div>
      </div>
      <div className="gap-2 flex">
        <AddNewContact />
        <UserLogout />
      </div>
    </div>
  );
}
