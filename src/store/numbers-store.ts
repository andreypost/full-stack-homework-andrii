import { create } from "zustand";
import { AdjacentPair, NumbersPair } from "@/interfaces/NumbersTypes";

export type NumbersStore = {
  numbers: NumbersPair[];
  pairs: AdjacentPair[];
  totalCount: number;
  addNewNumber: (n: NumbersPair) => void;
  setPairs: (pairs: AdjacentPair[]) => void;
  fetchPairs: (
    currentPairPage?: number,
    currentRowsPerPage?: number
  ) => Promise<void>;
};

export const useNumbersStore = create<NumbersStore>((set) => ({
  numbers: [],
  pairs: [],
  totalCount: 0,
  addNewNumber: (n) =>
    set((state) => ({
      numbers: [...state.numbers, n],
    })),
  setPairs: (pairs: AdjacentPair[]) => set({ pairs }),
  fetchPairs: async (currentPairPage = 0, currentRowsPerPage = 5) => {
    try {
      const params = new URLSearchParams({
        page: currentPairPage.toString(),
        rowsPerPage: currentRowsPerPage.toString(),
      });
      const res = await fetch(`/api/numbers?${params}`);
      if (!res.ok) throw new Error(`Server error ${res.status}`);

      const { data = [], totalCount = 0 } = await res.json();

      set({ pairs: data, totalCount });
    } catch (err) {
      console.error("Failed to fetch adjacent pairs", err);
    }
  },
}));
