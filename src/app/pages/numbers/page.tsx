"use client";
import { createContext, memo, useState } from "react";
import { Container, Typography } from "@mui/material";
import { NumbersForm } from "./NumbersForm";
import { NumbersTable } from "./NumbersTable";
import { PaginatedPairPage } from "@/interfaces/NumberTypes";

export const PaginatedPairNumbers = createContext({} as PaginatedPairPage);

const Numbers = memo(() => {
  const [pairPage, setPairPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  return (
    <Container maxWidth="lg">
      <PaginatedPairNumbers.Provider
        value={{
          pairPage,
          setPairPage,
          rowsPerPage,
          setRowsPerPage,
        }}
      >
        <Typography maxWidth="lg" variant="h6" sx={{ flexGrow: 1, mb: 2 }}>
          Numbers Page
        </Typography>
        <NumbersForm />
        <NumbersTable />
      </PaginatedPairNumbers.Provider>
    </Container>
  );
});
export default Numbers;
