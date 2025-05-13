import React from "react";

export const onKeyDownCheck = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (["e", "E", "-", "+", ",", "."].includes(e.key)) e.preventDefault();
};
