import "./app.styles.scss";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Box,
  CircularProgress,
  CssBaseline,
  StyledEngineProvider,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, grey } from "@mui/material/colors";

import ErrorBoundary from "src/Lib/ErrorBoundary";
import BoxEmpty from "src/Layout/BoxEmpty";
import BoxLayout from "src/Layout/Box";
import NotFound from "src/Layout/_404";

const Home = lazy(() => import("src/Controller/Home"));
const BombeGenerator = lazy(() => import("src/Controller/ComponentGenerator"));

// Webpack DefinePlugin (see config/webpack.common.js) provides PUBLIC_URL_PATH
// derived from process.env.PUBLIC_URL_PATH. Falls back to "/" for local dev.
const basename =
  (typeof PUBLIC_URL_PATH !== "undefined" && PUBLIC_URL_PATH) || "/";

const mainTheme = createTheme({
  palette: {
    primary: { main: blue[700] },
    secondary: { main: grey[700] },
  },
  components: {
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          "&+.MuiDialogContent-root": {
            paddingTop: "10px !important",
          },
        },
      },
    },
  },
});

function RouteFallback() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "40vh",
      }}
    >
      <CircularProgress aria-label="Loading" />
    </Box>
  );
}

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <ErrorBoundary>
          <BrowserRouter basename={basename}>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<BoxEmpty />}>
                  <Route index element={<Home />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="/generate-component" element={<BoxLayout />}>
                  <Route index element={<BombeGenerator />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ErrorBoundary>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
