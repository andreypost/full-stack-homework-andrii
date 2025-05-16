import React, { useState } from "react";

type Options = {
  min?: number;
  max?: number;
  negativeAllowed?: boolean;
  rejectZero?: boolean;
};

export const useNumericInput = (options: Options = {}) => {
  const {
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    negativeAllowed = false,
    rejectZero = false,
  } = options;

  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");

    const { value } = e.target;

    // Allow empty value
    if (value === "") {
      setValue("");
      return;
    }

    if (!negativeAllowed && !/^0$|^[1-9]\d*$/.test(value)) {
      setError(
        "Only whole numbers are allowed, starting from zero, no leading zeros and symbols!"
      );
      return;
    }

    if (negativeAllowed && rejectZero && !/^-$|^[-]?[1-9]\d*$/.test(value)) {
      setError(
        "Only whole both positive and negative numbers are allowed, no leading zeros and symbols!"
      );
      return;
    }

    const parsedNumber = parseFloat(value);

    if (parsedNumber < min || parsedNumber > max) {
      setError(`Number must be between ${min} and ${max}.`);
      return;
    }

    setValue(value);
  };

  return {
    value,
    setValue,
    error,
    setError,
    handleChange,
  };
};
