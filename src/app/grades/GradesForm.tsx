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
import { onKeyDownCheck } from "@/helpers/utils";

export const GradesForm = memo(() => {
  const [classValue, setClassValue] = useState<string>("");
  const [classError, setClassError] = useState<string>("");
  const { setSpinnerState } = useSpinnerStore();
  const [classGradeSuccess, setClassGradeSuccess] = useState("");
  const {
    value: gradeValue,
    setValue: setGradeValue,
    error: gradeError,
    setError: setGradeError,
    handleChange: handleChangeGradeValue,
  } = useNumericInput({ min: 0, max: 100, rejectZero: false });

  const handleClassChange = (e: SelectChangeEvent) => {
    setClassError("");
    setClassValue(e.target.value);
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
        <FormControl
          sx={{ width: "100%", maxWidth: "240px", position: "relative" }}
        >
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
            <p
              style={{
                position: "absolute",
                bottom: "-20px",
                fontSize: "12px",
                color: "red",
              }}
            >
              {classError}
            </p>
          )}
        </FormControl>
        <Box
          component="div"
          sx={{ width: "100%", maxWidth: "240px", position: "relative" }}
        >
          <TextField
            type="number"
            value={gradeValue}
            name="gradeNumber"
            label="Enter Grade"
            onKeyDown={onKeyDownCheck}
            onChange={handleChangeGradeValue}
          />
          {gradeError && (
            <p
              style={{
                position: "absolute",
                bottom: "-20px",
                fontSize: "12px",
                color: "red",
              }}
            >
              {gradeError}
            </p>
          )}
        </Box>
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
      </Box>
    </div>
  );
});
