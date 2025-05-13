"use client";
import React, { memo, useContext, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNumbersStore } from "@/store/numbers-store";
import { useSpinnerStore } from "@/store/spinner-store";
import { onKeyDownCheck } from "@/helpers/utils";
import { PaginatedPairNumbers } from "./page";
import { useNumericInput } from "@/hooks/useNumericInput";

export const NumbersForm = memo(() => {
  const { fetchPairs } = useNumbersStore();
  const { setSpinnerState } = useSpinnerStore();
  const { pairPage, rowsPerPage } = useContext(PaginatedPairNumbers);
  const [numberSuccess, setNumberSuccess] = useState<string>("");
  const {
    value: numberValue,
    setValue: setNumberValue,
    error: numberError,
    setError: setNumberError,
    handleChange: handleChangeNumberValue,
  } = useNumericInput();

  const handleNumberSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const parsed = parseFloat(numberValue);

    // if (!Number.isInteger(parsed)) {
    //   setNumberError("Only whole numbers allowed");
    //   return;
    // }

    setSpinnerState(true);
    setNumberError("");

    try {
      const response = await fetch("/api/numbers", {
        method: "POST",
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
        sx={{ display: "flex", gap: 2, mb: 1, position: "relative" }}
      >
        <TextField
          sx={{ width: "100%", maxWidth: "240px", position: "relative" }}
          type="number"
          value={numberValue}
          label="Enter number"
          // onKeyDown={(e) =>
          //   ["e", "E", "+", ",", "."].includes(e.key) && e.preventDefault()
          // }
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
        {numberError && (
          <p
            style={{
              position: "absolute",
              bottom: "-20px",
              fontSize: "12px",
              color: "red",
            }}
          >
            {numberError}
          </p>
        )}
      </Box>
    </div>
  );
});
