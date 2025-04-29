"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "var(--font-geist-sans), var(--font-geist-mono)",
  },
  cssVariables: true,
});
