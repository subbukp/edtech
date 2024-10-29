import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    hasPremiumAccess: boolean;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isAdmin: false,
  user: null,
  login: async (email, password) => {
    // Simulate API call
    if (email === 'admin@example.com' && password === 'admin') {
      set({
        isAuthenticated: true,
        isAdmin: true,
        user: {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
          hasPremiumAccess: true,
        },
      });
    } else if (email === 'user@example.com' && password === 'user') {
      set({
        isAuthenticated: true,
        isAdmin: false,
        user: {
          id: '2',
          name: 'Regular User',
          email: 'user@example.com',
          role: 'user',
          hasPremiumAccess: false,
        },
      });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => {
    set({
      isAuthenticated: false,
      isAdmin: false,
      user: null,
    });
  },
}));