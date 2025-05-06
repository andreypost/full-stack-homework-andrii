import { create } from "zustand";
import { AdjacentPair, NumbersPair } from "@/interfaces/NumberTypes";

export type NumbersStore = {
  numbers: NumbersPair[];
  pairs: AdjacentPair[];
  addNewNumber: (n: NumbersPair) => void;
  setPairs: (pairs: AdjacentPair[]) => void;
  fetchPairs: () => Promise<void>;
};

export const useNumbersStore = create<NumbersStore>((set) => ({
  numbers: [],
  pairs: [],
  addNewNumber: (n) =>
    set((state) => ({
      numbers: [...state.numbers, n],
    })),
  setPairs: (pairs: AdjacentPair[]) => set({ pairs }),
  fetchPairs: async () => {
    try {
      const res = await fetch("/api/numbers");
      const data = await res.json();
      set({ pairs: data });
    } catch (err) {
      console.error("Failed to fetch adjacent pairs", err);
    }
  },
}));
