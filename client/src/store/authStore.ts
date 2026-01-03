import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  getCurrentUser,
  logout,
  updateCurrentUser,
} from '../actions/userActions';

type User = {
  id: string;
  username: string;
  email: string;
  avatarImage?: string;
};
type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  checkAuth: () => Promise<void>;
  updateUser: (formData: FormData) => Promise<void>;
  logout: () => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      token: localStorage.getItem('token'),
      checkAuth: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          set({ user: null, token: null, loading: false });
          return;
        }

        try {
          const user = await getCurrentUser();
          set({ user, token, loading: false });
        } catch {
          localStorage.removeItem('token');
          set({ user: null, token: null, loading: false });
        }
      },
      updateUser: async (formData) => {
        const updatedUser = await updateCurrentUser(formData);

        set({ user: updatedUser });
      },
      logout: async () => {
        await logout();
        localStorage.removeItem('token');
        set({ user: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);

export default useAuthStore;
