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
  const [mathId] = useState(Math.floor(Math.random() * 1000));

  useEffect(() => {
    const getGradeData = async () => await fetchGradeNumbers();
    getGradeData();
  }, []);

  useEffect(() => {
    setFilteredGrades(gradeNumbers);
    setButtonState("allGrade");
    setSpinnerState(false);
  }, [gradeNumbers]);

  const classAveragesCalc = (min: number = 0): void => {
    if (!gradeNumbers?.length) return;

    let gradeByClass = gradeNumbers.reduce((acc, { class: cls, grade }) => {
      if (grade < min) return acc;
      !acc[cls] ? (acc[cls] = [+grade]) : acc[cls].push(+grade);
      return acc;
    }, {} as Record<string, number[]>);

    let averagesResult = Object.entries(gradeByClass).map(
      ([cls, grades], x) => ({
        id: mathId + x,
        class: cls,
        grade: +(grades.reduce((a, s) => a + s, 0) / grades.length).toFixed(2),
      })
    );

    setFilteredGrades(averagesResult);
  };

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
          onClick={() => {
            classAveragesCalc();
            setButtonState("averagesGrade");
          }}
        >
          Class Averages
        </Button>
        <Button
          variant={buttonState === "passingGrade" ? "contained" : "outlined"}
          onClick={() => {
            classAveragesCalc(55);
            setButtonState("passingGrade");
          }}
        >
          Passing Average
        </Button>
        <Button
          variant={buttonState === "highGrade" ? "contained" : "outlined"}
          onClick={() => {
            classAveragesCalc(70);
            setButtonState("highGrade");
          }}
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
