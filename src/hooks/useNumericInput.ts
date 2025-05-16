import React, { useState } from "react";

type Options = {
  min?: number;
  max?: number;
  integerOnly?: boolean;
  negativeAllowed?: boolean;
  rejectZero?: boolean;
  rejectLeadingZeros?: boolean;
};

export const useNumericInput = (options: Options = {}) => {
  const {
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    integerOnly = true,
    negativeAllowed = false,
    rejectZero = true,
    rejectLeadingZeros = true,
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

    // if (rejectZero && value === "0") {
    //   setError("Zero is not allowed.");
    //   return;
    // }

    if (negativeAllowed && rejectZero && !/^-$|^[-]?[1-9]\d*$/.test(value)) {
      setError(
        "Invalid format: only whole both positive and negative numbers allowed, no symbols."
      );
      return;
    }

    // if (rejectLeadingZeros && /^-?0\d+/.test(value)) {
    //   setError("Leading zeros both positive and negative are not allowed.");
    //   return;
    // }

    // const parsedNumber = parseFloat(value);

    // console.log("parsedNumber: ", parsedNumber);
    // console.log("Number.isNaN(parsedNumber): ", Number.isNaN(parsedNumber));

    // if (Number.isNaN(parsedNumber)) {
    //   setError("Not a valid number.");
    //   return;
    // }

    // if (integerOnly && !Number.isInteger(parsedNumber)) {
    //   setError("Only whole numbers are allowed.");
    //   return;
    // }

    // if (parsedNumber < min || parsedNumber > max) {
    //   setError(`Number must be between ${min} and ${max}.`);
    //   return;
    // }

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
