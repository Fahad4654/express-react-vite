import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

export default function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          404 - Not Found!
        </Typography>
        <Typography variant="body1" gutterBottom>
          The page you're looking for doesn't exist.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/"
          sx={{ mt: 3 }}
        >
          Go Home
        </Button>
      </Box>
    </Container>
  );
}