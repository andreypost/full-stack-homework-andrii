"use client";
import React, { memo, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNumbersStore } from "@/store/numbers-store";
import { useSpinnerStore } from "@/store/spinner-store";

export const NumbersForm = memo(() => {
  const [numberValue, setNumberValue] = useState<string>("");
  const { fetchPairs } = useNumbersStore();
  const { setSpinnerState } = useSpinnerStore();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSetNumberValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setError("");
    setNumberValue(value);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = parseFloat(numberValue);

    if (!Number.isInteger(parsed) || parsed === 0) {
      setError("Only whole numbers allowed");
      return;
    }
    setSpinnerState(true);
    setSuccess(false);
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

      await fetchPairs();
      setSuccess(true);
      setNumberValue("");
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
          {success && <span style={{ color: "green" }}>✓ Saved</span>}
        </>
      </Box>
      {error && <p style={{ position: "absolute", color: "red" }}>{error}</p>}
    </div>
  );
});
