import { create } from "zustand";
import { AdjacentNumberPair } from "@/interfaces/NumberTypes";

export type NumberPairStore = {
  numberPairs: AdjacentNumberPair[];
  totalCount: number;
  addNewNumberPair: (numberValue: string) => Promise<string>;
  fetchNumberPairs: (
    currentPairPage?: number,
    currentRowsPerPage?: number
  ) => Promise<void>;
  submitNumberPairAndRefresh: (
    numberValue: string,
    pairPage: number,
    rowsPerPage: number
  ) => Promise<string>;
};

export const useNumberPairStore = create<NumberPairStore>((set, get) => ({
  numberPairs: [],
  totalCount: 0,
  addNewNumberPair: async (numberValue): Promise<string> => {
    const response = await fetch("/api/numbers", {
      method: "POST",
      body: JSON.stringify({ numberValue }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return data.message;
  },
  fetchNumberPairs: async (
    currentPairPage = 0,
    currentRowsPerPage = 5
  ): Promise<void> => {
    try {
      const params = new URLSearchParams({
        page: currentPairPage.toString(),
        rowsPerPage: currentRowsPerPage.toString(),
      });
      const response = await fetch(`/api/numbers?${params}`, { method: "GET" });
      if (!response.ok) throw new Error(`Server error ${response.status}`);

      const { data = [], totalCount = 0 } = await response.json();

      set({ numberPairs: data, totalCount });
    } catch (error: any) {
      console.error("Failed to fetch adjacent pairs", error);
    }
  },
  submitNumberPairAndRefresh: async (
    numberValue: string,
    pairPage = 0,
    rowsPerPage = 5
  ): Promise<string> => {
    const message = await get().addNewNumberPair(numberValue);
    await get().fetchNumberPairs(pairPage, rowsPerPage);

    return message;
  },
}));
