import { create } from 'zustand';

type SignupData = {
  username: string;
  services: string[];
  preferences: string[];
};

type SignupStore = SignupData & {
  setUsername: (name: string) => void;
  setServices: (services: string[]) => void;
  setPreferences: (preferences: string) => void;
  clearPreferences: () => void;
  reset: () => void;
};

export const useSignupStore = create<SignupStore>((set) => ({
  username: '',
  services: [],
  preferences: [],
  setUsername: (username) => set({ username }),
  setServices: (services) => set({ services }),
  setPreferences: (preference: string) =>
    set((state: SignupStore): Partial<SignupStore> => {
      const alreadySelected = state.preferences.includes(preference);
      return {
        preferences: alreadySelected
          ? state.preferences.filter((p) => p !== preference)
          : [...state.preferences, preference],
      };
    }),
  clearPreferences: () => set({ preferences: [] }),
  reset: () => set({ username: '', services: [], preferences: [] }),
}));
