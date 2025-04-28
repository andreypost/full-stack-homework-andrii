import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { memo } from "react";

const Grades = memo(() => {
  return (
    <div className="section">
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Grades Page
      </Typography>
    </div>
  );
});
export default Grades;
