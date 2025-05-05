import { create } from 'zustand';

type SignupData = {
  username: string;
  services: string[];
  preferences: string[];
};

type SignupStore = SignupData & {
  setUsername: (name: string) => void;
  setServices: (services: string[]) => void;
  setPreferences: (preferences: string[]) => void;
  reset: () => void;
};

export const useSignupStore = create<SignupStore>((set) => ({
  username: '',
  services: [],
  preferences: [],
  setUsername: (username) => set({ username }),
  setServices: (services) => set({ services }),
  setPreferences: (preferences) => set({ preferences }),
  reset: () => set({ username: '', services: [], preferences: [] }),
}));
