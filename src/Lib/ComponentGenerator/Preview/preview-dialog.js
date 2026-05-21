import * as React from "react";
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import TabletIcon from "@mui/icons-material/Tablet";
import LaptopIcon from "@mui/icons-material/Laptop";
import RenderPreview from "./render-preview";
import PreviewFrame from "./preview-frame";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Preview viewport widths — match common breakpoints so the user can spot
// responsive issues before publishing.
const SIZES = [
  { id: "mobile", label: "Mobile", icon: PhoneAndroidIcon, width: 390 },
  { id: "tablet", label: "Tablet", icon: TabletIcon, width: 820 },
  { id: "desktop", label: "Desktop", icon: LaptopIcon, width: 1200 },
];

export default function PreviewDialog({ open, onClose, data }) {
  const [sizeId, setSizeId] = React.useState("desktop");
  const size = SIZES.find((s) => s.id === sizeId) || SIZES[2];
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      TransitionComponent={Transition}
      keepMounted={false}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: `linear-gradient(120deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 70%, ${theme.palette.primary.light} 100%)`,
          color: "common.white",
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <Stack
            direction="row"
            spacing={1.25}
            alignItems="center"
            sx={{ flexGrow: 1 }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 1.5,
                bgcolor: alpha("#fff", 0.18),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <VisibilityOutlinedIcon fontSize="small" />
            </Box>
            <Stack>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, lineHeight: 1.2 }}
              >
                Preview
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.85 }}>
                Live render of your canvas
              </Typography>
            </Stack>
          </Stack>

          <ButtonGroup
            variant="contained"
            size="small"
            aria-label="Viewport size"
            sx={{
              bgcolor: alpha("#fff", 0.18),
              borderRadius: 999,
              p: 0.5,
              boxShadow: "none",
              "& .MuiButton-root": {
                border: "none",
                color: "common.white",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "999px !important",
                px: 1.5,
                "&:hover": { bgcolor: alpha("#fff", 0.1), boxShadow: "none" },
              },
            }}
          >
            {SIZES.map((s) => {
              const Icon = s.icon;
              const active = sizeId === s.id;
              return (
                <Button
                  key={s.id}
                  onClick={() => setSizeId(s.id)}
                  startIcon={<Icon fontSize="small" />}
                  sx={{
                    bgcolor: active ? "common.white !important" : "transparent",
                    color: active
                      ? `${theme.palette.primary.dark} !important`
                      : "common.white",
                  }}
                >
                  {s.label}
                </Button>
              );
            })}
          </ButtonGroup>

          <Tooltip title="Close preview">
            <IconButton
              onClick={onClose}
              aria-label="Close preview"
              sx={{ color: "common.white" }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          background: `radial-gradient(circle at 30% 0%, ${alpha(
            theme.palette.primary.main,
            0.08
          )} 0%, ${theme.palette.grey[100]} 60%)`,
          py: { xs: 3, md: 5 },
          px: { xs: 2, md: 4 },
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: size.width,
            transition: "max-width 280ms ease",
            borderRadius: 3,
            bgcolor: "background.paper",
            boxShadow: "0 24px 60px rgba(15, 23, 42, 0.12)",
            border: "1px solid",
            borderColor: alpha(theme.palette.primary.main, 0.08),
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1,
              borderBottom: "1px solid",
              borderColor: "divider",
              bgcolor: alpha(theme.palette.grey[500], 0.05),
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
            aria-hidden="true"
          >
            {/* Faux browser dots — pure decoration */}
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
              <Box
                key={c}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: c,
                  opacity: 0.85,
                }}
              />
            ))}
            <Box
              sx={{
                ml: 1.5,
                flex: 1,
                height: 22,
                borderRadius: 999,
                bgcolor: alpha(theme.palette.grey[500], 0.12),
              }}
            />
          </Box>
          <PreviewFrame width="100%">
            <RenderPreview data={data} />
          </PreviewFrame>
        </Box>
      </Box>
    </Dialog>
  );
}
