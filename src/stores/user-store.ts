import { getAccessToken } from '@/lib/token-manager';
import { User } from '@/models/user.model';
import { create } from 'zustand';

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  initFromToken: () => void | Promise<void>;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLoading: true,
  isLoggedIn: false,
  login: () => {
    set({ isLoggedIn: true, isLoading: false });
  },
  logout: () => {
    set({ isLoggedIn: false, isLoading: false });
  },
  initFromToken: () => {
    const token = getAccessToken();
    if (!token) {
      set({ isLoggedIn: false, isLoading: false });
      return;
    }

    set({ isLoggedIn: true, isLoading: false });
  },
}));
