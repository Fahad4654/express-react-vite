import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Outlet } from 'react-router-dom';

// Check token every 5 minutes
const VALIDATION_INTERVAL = 5 * 60 * 1000;

export default function AuthGuard() {
  const { isAuthenticated, validateSession, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(async () => {
        const isValid = await validateSession();
        if (!isValid) {
          navigate('/login', { replace: true });
        }
      }, VALIDATION_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, validateSession, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}