import { memo } from "react";
import Link from "next/link";
import { AppBar, Button, Toolbar, Container, Typography } from "@mui/material";

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
            Generator
          </Typography>
          <Button color="inherit" component={Link} href="/numbers">
            Numbers
          </Button>
          <Button color="inherit" component={Link} href="/grades">
            Grades
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
});
