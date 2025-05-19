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
import { useNumericInput } from "@/hooks/useNumericInput";

export const GradesForm = memo(() => {
  const [classValue, setClassValue] = useState<string>("");
  const {
    value: gradeValue,
    setValue: setGradeValue,
    error: classGradeError,
    setError: setClassGradeError,
    handleChange: handleChangeGradeValue,
  } = useNumericInput({ min: 0, max: 100 });
  const [classGradeSuccess, setClassGradeSuccess] = useState("");
  const { setSpinnerState } = useSpinnerStore();

  const handleClassChange = (e: SelectChangeEvent) => {
    setClassGradeError("");
    setClassValue(e.target.value);
  };

  const handleGradeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!classValue) {
      setClassGradeError("Class name is required!");
      return;
    } else if (!gradeValue) {
      setClassGradeError("Grade number is required!");
      return;
    }

    setSpinnerState(true);
    setClassGradeError("");

    try {
      const response = await fetch("/api/grades", {
        method: "POST",
        body: JSON.stringify({ classValue, gradeValue }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      console.log("data: ", data);

      setClassGradeSuccess(data.message);
      setClassValue("");
      setGradeValue("");
      setTimeout(() => setClassGradeSuccess(""), 3000);
    } catch (error: any) {
      console.error(error);
      setClassGradeError(error.message);
      setTimeout(() => setClassGradeError(""), 3000);
    } finally {
      setSpinnerState(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleGradeSubmit}
      sx={{
        display: "flex",
        gap: 2,
        mb: 4,
        position: "relative",
      }}
    >
      <FormControl sx={{ width: "100%", maxWidth: "240px" }}>
        <InputLabel id="class-label">Class name:</InputLabel>
        <Select
          labelId="class-label"
          id="class-select"
          value={classValue}
          label="Class Name"
          autoComplete="off"
          onChange={handleClassChange}
        >
          <MenuItem value="Math">Math</MenuItem>
          <MenuItem value="Science">Science</MenuItem>
          <MenuItem value="History">History</MenuItem>
        </Select>
      </FormControl>
      <TextField
        sx={{ width: "100%", maxWidth: "240px" }}
        type="text"
        value={gradeValue}
        label="Enter Grade:"
        autoComplete="off"
        onChange={handleChangeGradeValue}
      />
      <Button
        sx={{ width: "100%", maxWidth: "240px" }}
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
      <p
        style={{
          position: "absolute",
          left: classValue ? "256px" : "0",
          bottom: "-20px",
          fontSize: "12px",
          color: "red",
          opacity: classGradeError ? "1" : "0",
          transition: "opacity 1s",
        }}
      >
        {classGradeError}
      </p>
    </Box>
  );
});
