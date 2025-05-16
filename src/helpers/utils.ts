import React from "react";

// for onKeyDown event input type="number"
export const onKeyDownCheck = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (["e", "E", "-", "+", ",", "."].includes(e.key)) e.preventDefault();
};

export const numberVavidationCheck = (
  value: string,
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER
): number | null => {
  const parsedValue = parseFloat(value.replace(",", ".")); // insdeaf of Number(""), it treats "" as 0

  if (
    Number.isNaN(parsedValue) ||
    !Number.isInteger(parsedValue) ||
    parsedValue < min ||
    parsedValue > max
  ) {
    return null;
  } else {
    return parsedValue;
  }
};
