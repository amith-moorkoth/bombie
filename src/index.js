import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import { TextField, Grid, Stack, Typography, Container } from "@mui/material";

ReactDOM.render(
  <Container maxWidth="xl">
    <App />
  </Container>,
  document.getElementById("root")
);
