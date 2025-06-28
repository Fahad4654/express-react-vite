import axios from "axios";
import { API_BASE_URL } from "../config";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface LoginResponse {
  token: string;
  expiresIn?: string;
  message?: string;
}

export interface ValidationResponse {
  isValid: boolean;
  user?: {
    id: string;
    email: string;
  };
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const validateToken = async (
  token: string
): Promise<ValidationResponse> => {
  const response = await api.get<ValidationResponse>("/auth/validate", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Add periodic token validation
export const checkTokenValidity = async (
  token: string | null
): Promise<boolean> => {
  if (!token) return false;

  try {
    const response = await validateToken(token);
    return response.isValid;
  } catch (error) {
    return false;
  }
};
