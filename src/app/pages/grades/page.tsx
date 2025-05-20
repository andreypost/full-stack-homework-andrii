import { memo } from "react";
import { Container, Typography } from "@mui/material";
import { GradesForm } from "./GradesForm";
import { GradesTable } from "./GradesTable";

const Grades = memo(() => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h6" sx={{ flexGrow: 1, mb: 2 }}>
        Grades Page
      </Typography>
      <GradesForm />
      <GradesTable />
    </Container>
  );
});
export default Grades;
