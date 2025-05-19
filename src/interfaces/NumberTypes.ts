import React from "react";

export type AdjacentNumberPair = {
  id1: number;
  number1: number;
  id2: number;
  number2: number;
  sum: number;
};

export interface PaginatedPairPage {
  pairPage: number;
  setPairPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}
