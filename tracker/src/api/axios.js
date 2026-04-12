import axios from "axios";
import {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
} from "../utils/tokenService";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

//  Request interceptor to add access token to headers
api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//  Response interceptor to handle 401 errors and refresh token
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    console.log("Interceptor caught error:", error.response?.status);

    //  
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        console.log("Calling refresh token...");

        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;

        console.log("New access token:", newAccessToken);

        // store new token
        setAccessToken(newAccessToken);

        // retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.log("Refresh token failed");

        clearAccessToken();

        window.location.href = "/login";

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;