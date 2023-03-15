import "./app.styles.scss";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, grey } from "@mui/material/colors";

import BombeGenerator from "src/Controller/ComponentGenerator";
import Home from "src/Controller/Home";
import _404 from "src/Layout/_404";
import Box from "src/Layout/Box";
import BoxEmpty from "src/Layout/BoxEmpty";

const mainTheme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: grey[700],
    },
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

/**generate-component */
class App extends React.Component {
  render() {
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={mainTheme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<BoxEmpty />}>
                <Route index element={<Home />} />
                <Route path="*" element={<_404 />} />
              </Route>
              <Route path="/generate-component" element={<Box />}>
                <Route index element={<BombeGenerator />} />
                <Route path="*" element={<_404 />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }
}
export default App;
