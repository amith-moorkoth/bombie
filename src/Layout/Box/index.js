import * as React from "react";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

/**
 * Builder route layout. Intentionally minimal — the builder owns its own
 * gradient header and toolbar, so this layout is just a body wrapper.
 */
function BuilderLayout() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Outlet />
    </Box>
  );
}

export default BuilderLayout;
