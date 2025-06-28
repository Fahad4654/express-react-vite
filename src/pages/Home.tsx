import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: "center" }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to our App
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          This is the home page of your application.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/login"
          size="large"
          sx={{ mt: 3 }}
        >
          Go to Login
        </Button>
      </Box>
    </Container>
  );
}
