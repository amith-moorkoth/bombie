import * as React from "react";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

function BoxEmpty() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}

export default BoxEmpty;
