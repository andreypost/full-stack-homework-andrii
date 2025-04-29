import { memo } from "react";
import { Container, Typography } from "@mui/material";
import { NumbersForm } from "@/components/NumbersForm";

const Numbers = memo(() => {
  return (
    <Container maxWidth="lg">
      <Typography maxWidth="lg" variant="h6" sx={{ flexGrow: 1 }}>
        Numbers Page
      </Typography>
      <NumbersForm />
    </Container>
  );
});
export default Numbers;
