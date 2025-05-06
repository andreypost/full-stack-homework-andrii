import { create } from "zustand";

export type SpinnerStore = {
  isLoading: boolean;
  setSpinnerState: (value: boolean) => void;
};

export const useSpinnerStore = create<SpinnerStore>((set) => ({
  isLoading: false,
  setSpinnerState: (value) => set({ isLoading: value }),
}));
