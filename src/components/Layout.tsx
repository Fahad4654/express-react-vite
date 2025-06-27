import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </>
  );
}