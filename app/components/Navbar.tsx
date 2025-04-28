import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { memo } from "react";

export const Navbar = memo(() => {
  return (
    <AppBar position="static">
      <Toolbar className="section">
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Full Stack Homework
        </Typography>
        <Button color="inherit" component={Link} href="/grades">
          Grades
        </Button>
        <Button color="inherit" component={Link} href="/numbers">
          Numbers
        </Button>
      </Toolbar>
    </AppBar>
  );
});
