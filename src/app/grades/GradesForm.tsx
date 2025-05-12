"use client";
import React, { memo, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useSpinnerStore } from "@/store/spinner-store";

export const GradesForm = memo(() => {
  const [classValue, setClassValue] = useState<string>("");
  const [gradeValue, setGradeValue] = useState<string>("");
  const [classError, setClassError] = useState<string>("");
  const [gradeError, setGradeError] = useState<string>("");
  const { setSpinnerState } = useSpinnerStore();
  const [classGradeSuccess, setClassGradeSuccess] = useState("");

  const handleClassChange = (e: SelectChangeEvent) => {
    setClassError("");
    setClassValue(e.target.value as string);
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGradeError("");
    setGradeValue(e.target.value as string);
  };

  const handleGradeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!classValue) {
      setClassError("Class name is required!");
      return;
    } else if (!gradeValue) {
      setGradeError("Grade number is required!");
      return;
    }

    setSpinnerState(true);

    try {
      const response = await fetch("/api/grades", {
        method: "POST",
        body: JSON.stringify({ class: classValue, grade: gradeValue }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      console.log("data: ", data);
      setClassGradeSuccess(data.message);
      setClassValue("");
      setGradeValue("");
      setTimeout(() => setClassGradeSuccess(""), 2000);
    } catch (error: any) {
      console.error(error);
      setClassError(error.message);
    } finally {
      setSpinnerState(false);
    }
  };

  return (
    <div style={{ paddingBottom: "30px" }}>
      <Box
        component="form"
        onSubmit={handleGradeSubmit}
        sx={{
          display: "flex",
          gap: 2,
          mb: 1,
        }}
      >
        <FormControl sx={{ width: "100%", maxWidth: "220px" }}>
          <InputLabel id="class-label">Class name:</InputLabel>
          <Select
            labelId="class-label"
            id="class-select"
            value={classValue}
            label="Class Name"
            name="classSelect"
            onChange={handleClassChange}
          >
            <MenuItem value="Math">Math</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
            <MenuItem value="History">History</MenuItem>
          </Select>
          {classError && (
            <p style={{ paddingTop: "10px", color: "red" }}>{classError}</p>
          )}
        </FormControl>
        <Box component="div" sx={{ width: "100%", maxWidth: "220px" }}>
          <TextField
            type="number"
            value={gradeValue}
            name="gradeNumber"
            label="Enter Grade"
            onChange={handleGradeChange}
          />
          {gradeError && (
            <p style={{ paddingTop: "10px", color: "red" }}>{gradeError}</p>
          )}
        </Box>
        <Button
          sx={{ width: "100%", maxWidth: "220px" }}
          type="submit"
          variant="contained"
          color="primary"
        >
          SUBMIT
        </Button>
        <span
          style={{
            margin: "auto 0",
            opacity: classGradeSuccess ? "1" : "0",
            color: "green",
            transition: "opacity 1s",
          }}
        >
          ✓ {classGradeSuccess}
        </span>
      </Box>
    </div>
  );
});
