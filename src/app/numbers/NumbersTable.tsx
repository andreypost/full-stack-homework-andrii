"use client";
import { useNumbersStore } from "@/store/numbers-store";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { memo, useEffect } from "react";

export const NumbersTable = memo(() => {
  const { pairs, fetchPairs } = useNumbersStore();

  useEffect(() => {
    fetchPairs();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID 1</TableCell>
            <TableCell>Number 1</TableCell>
            <TableCell>ID 2</TableCell>
            <TableCell>Number 2</TableCell>
            <TableCell>Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pairs?.length > 0 &&
            pairs.map(({ id1, number1, id2, number2, sum }) => (
              <TableRow key={id1}>
                <TableCell>{id1}</TableCell>
                <TableCell>{number1}</TableCell>
                <TableCell>{id2}</TableCell>
                <TableCell>{number2}</TableCell>
                <TableCell>{sum}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
