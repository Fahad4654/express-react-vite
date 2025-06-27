import { useAuth } from '../context/AuthContext';
import { Container, Typography, Button, Box, Paper } from '@mui/material';

export default function Dashboard() {
  const { isAuthenticated, logout } = useAuth();

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
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
          <Typography paragraph>
            Welcome to your dashboard! Here you can view your important data and
            manage your account.
          </Typography>
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