import axios from "axios";

export const setupInterceptors = (navigate: any) => {
  // Request interceptor
  axios.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        // You could add a quick client-side validation here
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // Attempt to validate the token
        try {
          const token = localStorage.getItem("token");
          if (token) {
            // You could call validateToken here if needed
            // If validation fails, redirect to login
            navigate("/login");
            return Promise.reject(error);
          }
        } catch (validationError) {
          navigate("/login");
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );
};
