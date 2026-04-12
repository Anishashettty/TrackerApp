
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Menu, MenuItem } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { deleteUser } from "../api/userApi";
import { clearAccessToken } from "../utils/tokenService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { currentUser,setCurrentUser } = useContext(AuthContext);

  const role = currentUser?.role;
  const email = currentUser?.email;
  const permissions = currentUser?.permissions || [];

  //  Dropdown state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 const navigate = useNavigate();

  async function handleDeleteSelf() {
  try {
    await deleteUser(currentUser.userId);

    await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      { withCredentials: true }
    );

    clearAccessToken();
    setCurrentUser(null);   // VERY IMPORTANT

    navigate("/login");     // correct way
  } catch (err) {
    console.error(err);
  }
}

  return (
    <AppBar position="static" elevation={2}>
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        px: 3,
      }}
    >
      {/* LEFT SECTION */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
        {/* LOGO / TITLE */}
        <Box sx={{ fontWeight: "bold", fontSize: "18px" }}>
          TRACKER APP
        </Box>
  
        {/* NAV LINKS */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {(role === "admin" ||
            role === "super-admin" ||
            permissions.includes("tracker")) && (
            <Button color="inherit" component={Link} to="/tracker">
              Tracker
            </Button>
          )}
  
          {(role === "admin" ||
            role === "super-admin" ||
            permissions.includes("dashboard")) && (
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
          )}
  
          {(role === "admin" || role === "super-admin") && (
            <Button color="inherit" component={Link} to="/users">
              Users
            </Button>
          )}
        </Box>
      </Box>
  
      {/* RIGHT SECTION (PROFILE) */}
      <Box>
        <Box
          onClick={handleClick}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "30px",
            px: 2,
            py: 0.6,
            backgroundColor: "rgba(255,255,255,0.08)",
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.15)",
            },
          }}
        >
          {/* AVATAR */}
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              backgroundColor: "#1565c0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {email ? email[0].toUpperCase() : "U"}
          </Box>
  
          {/* USER INFO */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "13px", fontWeight: 500 }}>
              {email}
            </span>
            <span style={{ fontSize: "11px", opacity: 0.7 }}>
              {role}
            </span>
          </Box>
        </Box>
  
        {/* DROPDOWN */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: 2,
              minWidth: 180,
            },
          }}
        >
          <MenuItem disabled>{email}</MenuItem>
  
          <MenuItem
  onClick={() => {
    handleClose();
    window.location.href = "/logout";
  }}
>
  Logout
</MenuItem>
  
          <MenuItem
            onClick={() => {
              handleClose();
              handleDeleteSelf();
            }}
            sx={{ color: "error.main" }}
          >
            Delete Account
          </MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  </AppBar>
  );
}
