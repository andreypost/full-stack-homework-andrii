"use client";
import { memo, useEffect, useState } from "react";
import { useGradeNumberStore } from "@/store/grade-number-store";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Spinner } from "@/components/SpinnerOverlay";

export const GradesTable = memo(() => {
  const { gradeNumbers, fetchGradeNumbers, changeGradeNumbersDate } =
    useGradeNumberStore();
  const [isLoading, setSpinnerState] = useState(true);

  useEffect(() => {
    const getGradeData = async () => {
      await fetchGradeNumbers();
    };
    getGradeData();
    setSpinnerState(false);
  }, []);

  const showAllGradeData = (): void => {};

  const classAveragesData = (): void => {
    let classAverages = [] as any;
    let gradeSum = gradeNumbers.reduce((acc, { class: cls, grade }) => {
      !acc[cls] ? (acc[cls] = [+grade]) : acc[cls].push(+grade);
      return acc;
    }, {} as Record<string, Array<number>>);
    let index = 0;
    for (let grade in gradeSum) {
      classAverages.push({
        id: ++index,
        class: grade,
        grade:
          gradeSum[grade].reduce((acc, sum) => acc + sum) /
          gradeSum[grade].length,
      });
      // classAverages[grade] =
      //   gradeSum[grade].reduce((acc, sum) => acc + sum) /
      //   gradeSum[grade].length;
    }
    console.log("gradeNumbers: ", gradeNumbers);
    console.log("classAverages: ", classAverages);
    changeGradeNumbersDate(classAverages);
  };

  // "Class Averages" - Calculates and displays average grade per class
  // "Passing Average" - Shows class averages for grades > 55
  // "High Performing Classes" - Lists classes with averages > 70

  if (isLoading) return <Spinner />;

  return (
    <Box>
      <Box display={"flex"} gap={1} mb={2}>
        <Button variant="contained" onClick={showAllGradeData}>
          Show All Data
        </Button>
        <Button variant="outlined" onClick={classAveragesData}>
          Class Averages
        </Button>
        <Button variant="outlined">Passing Average</Button>
        <Button variant="outlined">High Performing Classes</Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
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
                <TableCell>{cls}</TableCell>
                <TableCell>{grade}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Box>
  );
});
