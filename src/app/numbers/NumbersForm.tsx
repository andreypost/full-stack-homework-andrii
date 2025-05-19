"use client";
import React, { memo, useContext, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNumberPairStore } from "@/store/number-pair-store";
import { useSpinnerStore } from "@/store/spinner-store";
import { PaginatedPairNumbers } from "./page";
import { useNumericInput } from "@/hooks/useNumericInput";

export const NumbersForm = memo(() => {
  const { submitNumberPairAndRefresh } = useNumberPairStore();
  const { setSpinnerState } = useSpinnerStore();
  const { pairPage, rowsPerPage } = useContext(PaginatedPairNumbers);
  const [numberSuccess, setNumberSuccess] = useState<string>("");
  const {
    value: numberValue,
    setValue: setNumberValue,
    error: numberError,
    setError: setNumberError,
    handleChange: handleChangeNumberValue,
  } = useNumericInput({ negativeAllowed: true, rejectZero: true });

  const handleNumberSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!numberValue.trim()) {
      setNumberError("Number value is required!");
      return;
    }

    setSpinnerState(true);
    setNumberError("");

    try {
      const message = await submitNumberPairAndRefresh(
        numberValue,
        pairPage,
        rowsPerPage
      );

      setNumberSuccess(message);
      setNumberValue("");

      setTimeout(() => setNumberSuccess(""), 3000);
    } catch (error: any) {
      console.error(error);
      setNumberError(error.message || "Unexpected error");
      setTimeout(() => setNumberError(""), 3000);
    } finally {
      setSpinnerState(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleNumberSubmit}
      sx={{
        display: "flex",
        gap: 2,
        mb: 4,
        position: "relative",
      }}
    >
      <TextField
        sx={{ width: "100%", maxWidth: "240px" }}
        type="text"
        value={numberValue}
        label="Enter Number:"
        autoComplete="off"
        onChange={handleChangeNumberValue}
      />
      <Button
        sx={{ width: "100%", maxWidth: "240px" }}
        type="submit"
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
      <span
        style={{
          margin: "auto 0",
          opacity: numberSuccess ? "1" : "0",
          color: "green",
          transition: "opacity 1s",
        }}
      >
        ✓ {numberSuccess}
      </span>
      <p
        style={{
          position: "absolute",
          bottom: "-20px",
          fontSize: "12px",
          color: "red",
          opacity: numberError ? "1" : "0",
          transition: "opacity 1s",
        }}
      >
        {numberError}
      </p>
    </Box>
  );
});
