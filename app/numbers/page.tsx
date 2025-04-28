import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { memo } from "react";

const Numbers = memo(() => {
  return (
    <div className="section">
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Numbers Page
      </Typography>
    </div>
  );
});
export default Numbers;
