import { create } from "zustand";
import { AdjacentGradeNumber } from "@/interfaces/GradeTypes";

export type GradeNumberStore = {
  gradeNumbers: AdjacentGradeNumber[];
  changeGradeNumbersDate: (newData: []) => void;
  addNewGradeNumber: (
    classValue: string,
    gradeValue: string
  ) => Promise<string>;
  fetchGradeNumbers: () => Promise<void>;
  submitGradeNumberAndRefresh: (
    classValue: string,
    gradeValue: string
  ) => Promise<string>;
};

export const useGradeNumberStore = create<GradeNumberStore>((set, get) => ({
  gradeNumbers: [],
  changeGradeNumbersDate: (newData) => {
    set({ gradeNumbers: newData });
  },
  addNewGradeNumber: async (
    classValue: string,
    gradeValue: string
  ): Promise<string> => {
    const response = await fetch("/api/grades", {
      method: "POST",
      body: JSON.stringify({ classValue, gradeValue }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return data.message;
  },
  fetchGradeNumbers: async (): Promise<void> => {
    try {
      const response = await fetch("/api/grades", { method: "GET" });
      if (!response.ok) throw new Error(`Server error ${response.status}`);

      const { data = [] } = await response.json();

      set({ gradeNumbers: data });
    } catch (error: any) {
      console.error("Failed to fetch grades numbers", error);
    }
  },
  submitGradeNumberAndRefresh: async (
    classValue: string,
    gradeValue: string
  ): Promise<string> => {
    const message = await get().addNewGradeNumber(classValue, gradeValue);
    await get().fetchGradeNumbers();

    return message;
  },
}));
