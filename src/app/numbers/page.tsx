import { memo } from "react";
import { Container, Typography } from "@mui/material";
import { NumbersForm } from "./NumbersForm";
import { NumbersTable } from "./NumbersTable";

const Numbers = memo(() => {
  return (
    <Container maxWidth="lg">
      <Typography maxWidth="lg" variant="h6" sx={{ flexGrow: 1 }}>
        Numbers Page
      </Typography>
      <NumbersForm />
      <NumbersTable />
    </Container>
  );
});
export default Numbers;
