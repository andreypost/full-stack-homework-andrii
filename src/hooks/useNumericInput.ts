import React, { useState } from "react";

type Options = {
  min?: number;
  max?: number;
  allowEmpty?: boolean;
  integerOnly?: boolean;
  rejectZero?: boolean;
  rejectLeadingZeros?: boolean;
};

export const useNumericInput = (options: Options = {}) => {
  const {
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    allowEmpty = true,
    integerOnly = true,
    rejectZero = true,
    rejectLeadingZeros = true,
  } = options;

  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");

    const { value } = e.target;

    if (allowEmpty && value === "") {
      setValue("");
      return;
    }

    if (rejectZero && value === "0") {
      setError("Zero is not allowed.");
      return;
    }

    if (rejectLeadingZeros && /^0\d+/.test(value)) {
      setError("Leading zeros are not allowed.");
      return;
    }

    const parsed = Number(value);

    if (Number.isNaN(parsed)) {
      setError("Not a valid number.");
      return;
    }

    if (integerOnly && !Number.isInteger(parsed)) {
      setError("Only whole numbers are allowed.");
      return;
    }

    if (parsed < min || parsed > max) {
      setError(`Number must be between ${min} and ${max}.`);
      return;
    }

    setValue(value);
  };
  const reset = () => {
    setValue("");
    setError("");
  };

  return {
    value,
    setValue,
    error,
    setError,
    handleChange,
    reset,
  };
};
