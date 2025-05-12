"use client";
import React, { memo, useContext, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNumbersStore } from "@/store/numbers-store";
import { useSpinnerStore } from "@/store/spinner-store";
import { PaginatedPairNumbers } from "./page";

export const NumbersForm = memo(() => {
  const [numberValue, setNumberValue] = useState<string>("");
  const { fetchPairs } = useNumbersStore();
  const { setSpinnerState } = useSpinnerStore();
  const { pairPage, rowsPerPage } = useContext(PaginatedPairNumbers);
  const [numberSuccess, setNumberSuccess] = useState<string>("");
  const [numberError, setNumberError] = useState<string | null>(null);

  const handleSetNumberValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberError("");
    setNumberValue(e.target.value as string);
  };

  const handleNumberSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = parseFloat(numberValue);

    if (!Number.isInteger(parsed) || parsed === 0) {
      setNumberError("Only whole numbers allowed");
      return;
    }
    setSpinnerState(true);
    setNumberError("");

    try {
      const response = await fetch("/api/numbers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numberValue }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      await fetchPairs(pairPage, rowsPerPage);

      setNumberSuccess(data.message);
      setNumberValue("");
      setTimeout(() => setNumberSuccess(""), 2000);
    } catch (error: any) {
      console.error(error);
      setNumberError(error.message);
    } finally {
      setSpinnerState(false);
    }
  };

  return (
    <div style={{ paddingBottom: "30px" }}>
      <Box
        component="form"
        onSubmit={handleNumberSubmit}
        sx={{ display: "flex", gap: 2, mb: 1 }}
      >
        <TextField
          sx={{ width: "100%", maxWidth: "220px" }}
          type="number"
          value={numberValue}
          label="Enter number"
          onChange={handleSetNumberValue}
        />

        <Button
          sx={{ width: "100%", maxWidth: "220px" }}
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
      </Box>
      {numberError && (
        <p style={{ position: "absolute", color: "red" }}>{numberError}</p>
      )}
    </div>
  );
});
