import { memo } from "react";
import { Container, Typography } from "@mui/material";
import { GradesForm } from "./GradesForm";

const Grades = memo(() => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h6" sx={{ flexGrow: 1, mb: 2 }}>
        Grades Page
      </Typography>
      <GradesForm />
    </Container>
  );
});
export default Grades;
