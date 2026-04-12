   

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import { loginUser } from "../../../api/authApi";
import { AuthContext } from "../../../context/AuthContext";
import api from "../../../api/axios";
import { setAccessToken } from "../../../utils/tokenService";
export default function LoginContainer() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await loginUser({ email, password });

      //  store in memory
     setAccessToken(res.data.accessToken);

      const currentUserRes = await api.get("/auth/current-user"); 

      const user = currentUserRes.data; 

      setCurrentUser(user); 

      //  navigation
      if (user.role === "admin") {
        navigate("/users");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Login
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  );
}
