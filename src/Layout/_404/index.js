import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "src/assets/logo.svg";

function NotFound() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        background: "white",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack spacing={2} alignItems="center">
        <img src={logo} width="100" alt="Bombie logo" />
        <Typography variant="h2" component="h1" fontWeight="bold">
          404
        </Typography>
        <Typography variant="body1">
          The page you’re looking for doesn’t exist.
        </Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Stack>
    </Box>
  );
}

export default NotFound;
