import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Container as MuiContainer,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { JsonView, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

import { Container } from "./Container";
import Elements from "./Elements";
import bombieContext from "src/Lib/ComponentGenerator/bombie-context";
import SampleGalleryDialog from "./Samples/sample-gallery";
import PreviewDialog from "./Preview/preview-dialog";
import logo from "src/assets/logo.svg";

function HeaderBar({ darkMode, onToggleDarkMode }) {
  const theme = useTheme();
  return (
    <Box
      component="header"
      sx={{
        position: "relative",
        background: `linear-gradient(120deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 60%, ${theme.palette.primary.light} 100%)`,
        color: "common.white",
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 2.5 },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: alpha("#fff", 0.18),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(6px)",
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Bombie"
              sx={{ width: 32, height: 32 }}
            />
          </Box>
          <Box>
            <Typography
              variant="h5"
              component="h1"
              sx={{ fontWeight: 700, lineHeight: 1.2 }}
            >
              Generate Component
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              Build UI components visually and export clean JSON
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Tooltip
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <IconButton
              onClick={onToggleDarkMode}
              size="large"
              sx={{ color: "common.white" }}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </IconButton>
          </Tooltip>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.25}
            sx={{
              px: 1.5,
              py: 0.75,
              borderRadius: 999,
              bgcolor: alpha("#fff", 0.15),
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: alpha("#fff", 0.9),
                color: "primary.dark",
                fontSize: "0.85rem",
                fontWeight: 700,
              }}
            >
              AM
            </Avatar>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, display: { xs: "none", sm: "block" } }}
            >
              Amith Moorkoth
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

function Toolbar({ onViewJson, onPreview, onOpenSamples }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        flexWrap: "wrap",
        mt: 3,
        mb: 2,
      }}
    >
      <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
        <Button
          variant="outlined"
          startIcon={<AutoAwesomeOutlinedIcon />}
          onClick={onOpenSamples}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Samples
        </Button>
        <Button
          variant="outlined"
          startIcon={<UploadFileOutlinedIcon />}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Upload JSON
        </Button>
        <Button
          variant="outlined"
          startIcon={<DownloadOutlinedIcon />}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Download JSON
        </Button>
        <Button
          variant="outlined"
          startIcon={<VisibilityOutlinedIcon />}
          onClick={onPreview}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Preview
        </Button>
      </Stack>
      <Button
        onClick={onViewJson}
        variant="contained"
        startIcon={<CodeOutlinedIcon />}
        sx={{ textTransform: "none", fontWeight: 600, px: 2.5 }}
      >
        View JSON
      </Button>
    </Box>
  );
}

function TipsFooter() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        mt: 3,
        p: 2,
        borderRadius: 2,
        bgcolor: alpha(theme.palette.primary.main, 0.06),
        border: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.18),
        display: "flex",
        alignItems: { xs: "flex-start", md: "center" },
        gap: 1.5,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ color: "primary.main" }}
      >
        <InfoOutlinedIcon fontSize="small" />
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          Tips
        </Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary">
        Drag components from the right panel to the canvas
        <Box component="span" sx={{ mx: 1, color: "text.disabled" }}>
          •
        </Box>
        Reorder using the controls
        <Box component="span" sx={{ mx: 1, color: "text.disabled" }}>
          •
        </Box>
        View JSON to see the generated output
      </Typography>
    </Box>
  );
}

export default function ComponentGenerator() {
  const [data, setdata, effect] = React.useContext(bombieContext);
  const [jsonViewOpener, setJsonViewOpener] = React.useState(false);
  const [samplesOpen, setSamplesOpen] = React.useState(false);
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const theme = useTheme();
  const isWide = useMediaQuery(theme.breakpoints.up("md"));

  const handleLoadSample = React.useCallback(
    (sample) => {
      setdata(sample.build());
      setSamplesOpen(false);
    },
    [setdata]
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <HeaderBar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((v) => !v)}
      />

      <MuiContainer maxWidth="xl" sx={{ pb: 6 }}>
        <Toolbar
          onViewJson={() => setJsonViewOpener(true)}
          onPreview={() => setPreviewOpen(true)}
          onOpenSamples={() => setSamplesOpen(true)}
        />

        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "flex-start",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Canvas */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              width: "100%",
              p: { xs: 2, md: 3 },
              borderRadius: 3,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: 1,
              minHeight: 480,
            }}
          >
            <DndProvider backend={HTML5Backend}>
              <Container />
            </DndProvider>
          </Box>

          {/* Palette */}
          <Box
            sx={{
              width: { xs: "100%", md: 340 },
              flexShrink: 0,
              p: 2.5,
              borderRadius: 3,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: 1,
              position: { md: "sticky" },
              top: { md: 16 },
              maxHeight: { md: "calc(100vh - 32px)" },
              overflowY: "auto",
            }}
          >
            <DndProvider backend={HTML5Backend}>
              <Elements />
            </DndProvider>
          </Box>
        </Box>

        <TipsFooter />
      </MuiContainer>

      <Drawer
        anchor="right"
        open={jsonViewOpener}
        onClose={() => setJsonViewOpener(false)}
      >
        <Box sx={{ p: 3, width: { xs: "90vw", sm: 480 } }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <CodeOutlinedIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              JSON Output
            </Typography>
          </Stack>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ fontWeight: 700, letterSpacing: "0.1em" }}
          >
            Components
          </Typography>
          <Box sx={{ mb: 2, mt: 0.5 }}>
            <JsonView data={data} style={defaultStyles} />
          </Box>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ fontWeight: 700, letterSpacing: "0.1em" }}
          >
            Effects
          </Typography>
          <Box sx={{ mt: 0.5 }}>
            <JsonView data={effect} style={defaultStyles} />
          </Box>
        </Box>
      </Drawer>

      <SampleGalleryDialog
        open={samplesOpen}
        onClose={() => setSamplesOpen(false)}
        onLoad={handleLoadSample}
        currentData={data}
      />

      <PreviewDialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        data={data}
      />

      {/*
        Dark mode toggle is wired to local state but not yet propagated to a
        ThemeProvider. Lift this into App.js (palette.mode = darkMode ? "dark"
        : "light") to actually swap the theme.
      */}
      {!isWide && darkMode && null}
    </Box>
  );
}
