"use client";
import React, { memo, useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export const NumbersForm = memo(() => {
  const [numberValue, setNumberValue] = useState<number | string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSetNumberValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log("value:", value);
    setNumberValue(value);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("numberValue:", numberValue);
    try {
      const response = await fetch("/api/numbers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numberValue }),
      });
      if (!response.ok) {
        throw new Error("Submission failed");
      }
      console.log("response: ", response);
    } catch (error: any) {
      console.error(error);
      setError(error);
    }
    setSuccess(true);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 2, alignItems: "center" }}
    >
      <>
        <TextField
          label="Enter number"
          type="number"
          value={numberValue}
          onChange={handleSetNumberValue}
          error={!!error}
          helperText={error || ""}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        {success && <span style={{ color: "green" }}>✓ Saved</span>}
      </>
    </Box>
  );
});
