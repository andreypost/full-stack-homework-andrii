"use client";
import { memo, useEffect, useState } from "react";
import { useGradeNumberStore } from "@/store/grade-number-store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Spinner } from "@/components/SpinnerOverlay";

export const GradesTable = memo(() => {
  const { gradeNumbers, fetchGradeNumbers } = useGradeNumberStore();
  const [isLoading, setSpinnerState] = useState(true);
  
  useEffect(() => {
    const getGradeData = async () => {
      await fetchGradeNumbers();
    };
    getGradeData();
    setSpinnerState(false);
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <strong>ID</strong>
          </TableCell>
          <TableCell>
            <strong>Class</strong>
          </TableCell>
          <TableCell>
            <strong>Grade</strong>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {gradeNumbers?.length > 0 &&
          gradeNumbers.map(({ id, class: cls, grade }) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{cls}</TableCell>
              <TableCell>{grade}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
});
