"use client";
import React, { memo, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { Spinner } from "./Spinner";

export const NumbersForm = memo(() => {
  const [numberValue, setNumberValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSetNumberValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log("value:", value);
    setNumberValue(value);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    await fetch("/api/numbers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ numberValue }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data;
      })
      .then((data) => {
        console.log("data: ", data);
        setSuccess(true);
        setNumberValue("");
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading && <Spinner />}
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
            // error={!!error}
            helperText={error || ""}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          {success && <span style={{ color: "green" }}>✓ Saved</span>}
        </>
      </Box>
    </>
  );
});
