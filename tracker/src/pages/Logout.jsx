// import React, { useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// export default function Logout() {
//   const navigate = useNavigate();
//   const { setCurrentUser } = useContext(AuthContext);

//   useEffect(() => {
//     // remove token
//     localStorage.removeItem("token");

//     // clear user from context
//     setCurrentUser(null);

//     // redirect to login
//     navigate("/login");
//   }, [navigate, setCurrentUser]);

//   return null;
// }


import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import { clearAccessToken } from "../utils/tokenService";

export default function Logout() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    async function handleLogout() {
      try {
        await api.post("/auth/logout", {}, { withCredentials: true });
      } catch (err) {
        console.log("Logout error",err.response?.data || err.message);
      }

      clearAccessToken();
      setCurrentUser(null);
      navigate("/login");
    }

    handleLogout();
  }, [navigate, setCurrentUser]);

  return null;
}