import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  id?: string;
  email?: string;
  iat?: number;
  // Add other claims you expect in your token
}

export const decodeToken = (token: string): DecodedToken => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return {};
  }
};

export const isTokenValid = (token: string): boolean => {
  try {
    const decoded = decodeToken(token);
    // Add any additional validation logic here
    return !!decoded && !!decoded.email; // Basic check for required claims
  } catch (error) {
    return false;
  }
};

export const getTokenUserInfo = (token: string) => {
  const decoded = decodeToken(token);
  return {
    id: decoded.id || '',
    email: decoded.email || '',
    // Map other claims to user properties
  };
};