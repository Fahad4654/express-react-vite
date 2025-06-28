import { useAuth } from "../context/AuthContext";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Avatar,
} from "@mui/material";

export default function Dashboard() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container>
        <Typography variant="h6">Please login to view this page</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
              {user?.email?.charAt(0)}
            </Avatar>
            <Typography variant="h4" component="h1">
              Welcome, {user?.email}
            </Typography>
          </Box>
          <Typography paragraph>Email: {user?.email}</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={logout}
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}
