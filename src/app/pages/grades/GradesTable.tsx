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
import { AdjacentGradeNumber } from "@/interfaces/GradeTypes";

export const GradesTable = memo(() => {
  const { gradeNumbers, fetchGradeNumbers } = useGradeNumberStore();
  const [filteredGrades, setFilteredGrades] = useState<AdjacentGradeNumber[]>(
    []
  );
  const [buttonState, setButtonState] = useState<string>("allGrade");
  const [isLoading, setSpinnerState] = useState<boolean>(true);

  useEffect(() => {
    const getGradeData = async () => await fetchGradeNumbers();
    getGradeData();
  }, []);

  useEffect(() => {
    setFilteredGrades(gradeNumbers);
    setButtonState("allGrade");
    setSpinnerState(false);
  }, [gradeNumbers]);

  const classAveragesCalc = (): void => {
    if (!gradeNumbers?.length) return;

    let gradeByClass = gradeNumbers.reduce((acc, { class: cls, grade }) => {
      !acc[cls] ? (acc[cls] = [+grade]) : acc[cls].push(+grade);
      return acc;
    }, {} as Record<string, number[]>);

    let averagesResult = Object.entries(gradeByClass).map(
      ([cls, grade], x) => ({
        id: x,
        class: cls,
        grade: +(grade.reduce((c, s) => c + s) / grade.length).toFixed(2),
      })
    );

    setFilteredGrades(averagesResult);
    setButtonState("averagesGrade");
  };

  const gradeFiltering = (min: number, butState: string) => {
    setFilteredGrades(gradeNumbers.filter(({ grade }) => grade > min));
    setButtonState(butState);
  };

  // "Class Averages" - Calculates and displays average grade per class
  // "Passing Average" - Shows class averages for grades > 55
  // "High Performing Classes" - Lists classes with averages > 70

  if (isLoading) return <Spinner />;

  return (
    <Box>
      <Box display={"flex"} gap={1} mb={2}>
        <Button
          variant={buttonState === "allGrade" ? "contained" : "outlined"}
          onClick={() => {
            setFilteredGrades(gradeNumbers);
            setButtonState("allGrade");
          }}
        >
          Show All Data
        </Button>
        <Button
          variant={buttonState === "averagesGrade" ? "contained" : "outlined"}
          onClick={classAveragesCalc}
        >
          Class Averages
        </Button>
        <Button
          variant={buttonState === "passingGrade" ? "contained" : "outlined"}
          onClick={() => gradeFiltering(55, "passingGrade")}
        >
          Passing Average
        </Button>
        <Button
          variant={buttonState === "highGrade" ? "contained" : "outlined"}
          onClick={() => gradeFiltering(70, "highGrade")}
        >
          High Performing Classes
        </Button>
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
          {filteredGrades?.length > 0 &&
            filteredGrades.map(({ id, class: cls, grade }) => (
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
