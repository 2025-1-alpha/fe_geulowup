import { create } from 'zustand';

type SignupData = {
  username: string;
  role: string;
  preferences: string[];
};

type SignupStore = SignupData & {
  setUsername: (name: string) => void;
  setRole: (role: string) => void;
  setPreferences: (preferences: string) => void;
  clearRole: () => void;
  clearPreferences: () => void;
  reset: () => void;
};

export const useSignupStore = create<SignupStore>((set) => ({
  username: '',
  role: '',
  preferences: [],

  setUsername: (username) => set({ username }),
  setRole: (role) => set({ role }),
  setPreferences: (preference: string) =>
    set((state: SignupStore): Partial<SignupStore> => {
      const alreadySelected = state.preferences.includes(preference);
      return {
        preferences: alreadySelected
          ? state.preferences.filter((p) => p !== preference)
          : [...state.preferences, preference],
      };
    }),

  clearRole: () => set({ role: '' }),
  clearPreferences: () => set({ preferences: [] }),
  reset: () => set({ username: '', role: '', preferences: [] }),
}));
