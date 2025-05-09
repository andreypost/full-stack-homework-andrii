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
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSetNumberValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setError("");
    setNumberValue(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = parseFloat(numberValue);

    if (!Number.isInteger(parsed) || parsed === 0) {
      setError("Only whole numbers allowed");
      return;
    }
    setSpinnerState(true);
    setError("");

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

      setSuccess(true);
      setNumberValue("");
      setTimeout(() => setSuccess(false), 1000);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    } finally {
      setSpinnerState(false);
    }
  };

  return (
    <div style={{ paddingBottom: "30px" }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 2, alignItems: "center", mb: 1 }}
      >
        <>
          <TextField
            label="Enter number"
            type="number"
            value={numberValue}
            onChange={handleSetNumberValue}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <span
            style={{
              opacity: success ? "1" : "0",
              color: "green",
              transition: "opacity 1s",
            }}
          >
            ✓ Saved
          </span>
        </>
      </Box>
      {error && <p style={{ position: "absolute", color: "red" }}>{error}</p>}
    </div>
  );
});
