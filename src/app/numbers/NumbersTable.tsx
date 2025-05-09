"use client";
import React, { memo, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { SpinnerOverlay } from "@/components/SpinnerOverlay";
import { useNumbersStore } from "@/store/numbers-store";
import { PaginatedPairNumbers } from "./page";

export const NumbersTable = memo(() => {
  const { pairPage, setPairPage, rowsPerPage, setRowsPerPage } =
    useContext(PaginatedPairNumbers);
  const { pairs, totalCount, fetchPairs } = useNumbersStore();
  const [isLoading, setSpinnerState] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pageFromQuery = parseInt(searchParams.get("page") || "0", 10);
    const rowsFromQuery = parseInt(searchParams.get("rowsPerPage") || "5", 10);

    setPairPage(pageFromQuery);
    setRowsPerPage(rowsFromQuery);
    const getPairs = async () => {
      // requestAnimationFrame(async () => {
      // await new Promise((res) => setTimeout((r) => res(r), 0));
      await fetchPairs(pageFromQuery, rowsFromQuery);
      setSpinnerState(false);
      // });
    };
    getPairs();
  }, []);

  const handleChangePage = async (_: any, newPage: number) => {
    setSpinnerState(true);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    router.push(`/numbers?${newParams}`);
    await fetchPairs(newPage, rowsPerPage);
    setPairPage(newPage);
    setSpinnerState(false);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSpinnerState(true);
    const newParams = new URLSearchParams(searchParams);
    const newRows = parseInt(event.target.value, 10);
    newParams.set("page", "0");
    newParams.set("rowsPerPage", newRows.toString());
    router.push(`/numbers?${newParams}`);
    await fetchPairs(0, newRows);
    setPairPage(0);
    setRowsPerPage(newRows);
    setSpinnerState(false);
  };

  // const paginated =
  //   (pairs?.length > 0 &&
  //     pairs.slice(
  //       pairPage * rowsPerPage,
  //       pairPage * rowsPerPage + rowsPerPage
  //     )) ||
  //   [];

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
      <TablePagination
        component="div"
        count={totalCount}
        page={pairPage}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </TableContainer>
  );
});
