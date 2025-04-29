import { AppBar, Button, Toolbar, Container, Typography } from "@mui/material";
import Link from "next/link";
import { memo } from "react";

export const Navbar = memo(() => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{ flexGrow: 1 }}
          >
            Full Stack Homework
          </Typography>
          <Button color="inherit" component={Link} href="/grades">
            Grades
          </Button>
          <Button color="inherit" component={Link} href="/numbers">
            Numbers
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
});
