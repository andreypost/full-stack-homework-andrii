"use client";
import { useSpinnerStore } from "@/store/spinner-store";
import { CircularProgress, Box } from "@mui/material";

export const SpinnerOverlay = () => {
  const { isLoading } = useSpinnerStore();

  if (!isLoading) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.5)",
        zIndex: 9999,
      }}
    >
      <CircularProgress />
    </Box>
  );
};
