import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AccessDenied() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h4" color="error" mb={2}>
        Access Denied 🚫
      </Typography>

      <Typography mb={3}>
        You don’t have permission to access this page.
      </Typography>

      <Button variant="contained" onClick={() => {
  
  navigate("/logout");
}}>
        Go Home
      </Button>
    </Box>
  );
}