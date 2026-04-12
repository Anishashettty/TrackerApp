

import { useState, useEffect } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";
import { refreshAccessToken } from "../api/authApi";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
	async function initAuth() {
	  try {
		//  First get access token using refresh token
		const newToken = await refreshAccessToken();
  
		if (!newToken) {
		  setCurrentUser(null);
		  return;
		}
  
		//  Now call protected API
		const res = await api.get("/auth/current-user");
  
		setCurrentUser(res.data);
	  } catch (err) {
		console.log("Auth error:", err.message);
		setCurrentUser(null);
	  } finally {
		setLoading(false);
	  }
	}
  
	initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}