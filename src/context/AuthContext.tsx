import { createContext, useContext, type ReactNode, useState, useEffect, useCallback } from 'react';
import { login as apiLogin, validateToken } from '../api/authApi';
import { isTokenValid, getTokenUserInfo } from '../utils/token';

interface User {
  id: string;
  email: string;
  // Add other user fields
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  validateSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const validateSession = useCallback(async (): Promise<boolean> => {
    const storedToken = localStorage.getItem('token');
    
    if (!storedToken) {
      return false;
    }

    // First validate token structure locally
    if (!isTokenValid(storedToken)) {
      localStorage.removeItem('token');
      return false;
    }

    try {
      // Then validate with the server
      await validateToken(storedToken);
      const userInfo = getTokenUserInfo(storedToken);
      setUser(userInfo);
      setToken(storedToken);
      return true;
    } catch (error) {
      localStorage.removeItem('token');
      console.error('Token validation failed:', error);
      return false;
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      await validateSession();
      setIsLoading(false);
    };

    initializeAuth();
  }, [validateSession]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiLogin(email, password);
      
      if (!isTokenValid(response.token)) {
        throw new Error('Invalid token received');
      }

      localStorage.setItem('token', response.token);
      const userInfo = getTokenUserInfo(response.token);
      setUser(userInfo);
      setToken(response.token);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout,
    validateSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}