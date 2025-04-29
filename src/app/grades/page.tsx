import { memo } from "react";
import { Container, Typography } from "@mui/material";

const Grades = memo(() => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Grades Page
      </Typography>
    </Container>
  );
});
export default Grades;
