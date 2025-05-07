"use client";
import { SpinnerOverlay } from "@/components/SpinnerOverlay";
import { useNumbersStore } from "@/store/numbers-store";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";

export const NumbersTable = memo(() => {
  const { pairs, fetchPairs } = useNumbersStore();
  const [isLoading, setSpinnerState] = useState(true);
  const [tablePage, setTablePage] = useState(0);
  const [tableRowPerPage, setTableRowPerPage] = useState(5);

  useEffect(() => {
    const getPairs = async () => {
      // requestAnimationFrame(async () => {
      // await new Promise((res) => setTimeout((r) => res(r), 0));
      await fetchPairs();
      setSpinnerState(false);
      // });
    };
    getPairs();
  }, []);

  const paginated = pairs.slice(
    tablePage * tableRowPerPage,
    tablePage * tableRowPerPage + tableRowPerPage
  );

  if (isLoading) return <SpinnerOverlay />;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="number pairs table">
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
          {paginated?.length > 0 &&
            paginated.map(({ id1, number1, id2, number2, sum }) => (
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
      <TablePagination
        component="div"
        count={pairs.length}
        page={tablePage}
        onPageChange={(e, newPage) => setTablePage(newPage)}
        rowsPerPage={tableRowPerPage}
        onRowsPerPageChange={(e) => {
          setTableRowPerPage(parseInt(e.target.value, 10));
          setTablePage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </TableContainer>
  );
});
