"use client";
import { useRouter, useSearchParams } from "next/navigation";
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
import React, { memo, useContext, useEffect, useState } from "react";
import { PaginatedPairNumbers } from "./page";

export const NumbersTable = memo(() => {
  const { pairPage, setPairPage, rowsPerPage, setRowsPerPage } =
    useContext(PaginatedPairNumbers);
  const { pairs, fetchPairs } = useNumbersStore();
  const [isLoading, setSpinnerState] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    const currentPairPage = parseInt(searchParams.get("page") || "0", 10);
    const currentRowsPerPage = parseInt(
      searchParams.get("rowsPerPage") || "5",
      10
    );
    setPairPage(currentPairPage);
    setRowsPerPage(currentRowsPerPage);
    const getPairs = async () => {
      // requestAnimationFrame(async () => {
      // await new Promise((res) => setTimeout((r) => res(r), 0));
      await fetchPairs(currentPairPage, currentRowsPerPage);
      setSpinnerState(false);
      // });
    };
    getPairs();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    params.set("page", newPage.toString());
    router.push(`/numbers?${params}`);
    setPairPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRows = parseInt(event.target.value, 10);
    params.set("page", "0");
    params.set("rowsPerPage", newRows.toString());
    router.push(`/numbers?${params}`);
    setPairPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const paginated =
    (pairs?.length > 0 &&
      pairs.slice(
        pairPage * rowsPerPage,
        pairPage * rowsPerPage + rowsPerPage
      )) ||
    [];

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
        page={pairPage}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </TableContainer>
  );
});
