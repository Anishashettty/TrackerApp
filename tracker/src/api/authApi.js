import api from "./axios";
import axios from "axios"; // REQUIRED
import { setAccessToken, clearAccessToken } from "../utils/tokenService";

//  LOGIN
export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);

  // store access token in memory
  setAccessToken(res.data.accessToken);

  return res;
};

//  REFRESH TOKEN
export const refreshAccessToken = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/refresh-token",
      {},
      { withCredentials: true }
    );

    setAccessToken(res.data.accessToken);

    return res.data.accessToken;
  } catch (err) {
    clearAccessToken();
    console.log("Refresh token error", err.response?.data || err.message);
    return null;
  }
};