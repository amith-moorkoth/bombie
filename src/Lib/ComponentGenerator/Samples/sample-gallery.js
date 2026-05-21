import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { SAMPLES } from "./templates";

const ICONS = {
  LockOutlined: LockOutlinedIcon,
  DashboardOutlined: DashboardOutlinedIcon,
  SettingsOutlined: SettingsOutlinedIcon,
  HelpOutlineOutlined: HelpOutlineOutlinedIcon,
};

function SampleCard({ sample, onLoad, hasCurrentWork }) {
  const theme = useTheme();
  const Icon = ICONS[sample.iconName] || EditOutlinedIcon;
  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        transition:
          "transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: `0 8px 24px ${alpha(sample.accent, 0.15)}`,
          borderColor: alpha(sample.accent, 0.5),
        },
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: 2,
          bgcolor: alpha(sample.accent, 0.12),
          color: sample.accent,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon />
      </Box>
      <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
        {sample.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
        {sample.description}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
        <Button
          variant="contained"
          startIcon={<EditOutlinedIcon />}
          onClick={() => onLoad(sample)}
          sx={{
            bgcolor: sample.accent,
            "&:hover": { bgcolor: alpha(sample.accent, 0.85) },
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          {hasCurrentWork ? "Replace & edit" : "Load & edit"}
        </Button>
      </Stack>
    </Box>
  );
}

export default function SampleGalleryDialog({
  open,
  onClose,
  onLoad,
  currentData,
}) {
  const hasCurrentWork = Array.isArray(currentData) && currentData.length > 0;
  const [confirming, setConfirming] = React.useState(null);

  const requestLoad = (sample) => {
    if (hasCurrentWork) {
      setConfirming(sample);
    } else {
      onLoad(sample);
    }
  };

  const proceedConfirm = () => {
    if (confirming) onLoad(confirming);
    setConfirming(null);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        scroll="paper"
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ pr: 6 }}>
          <Stack>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Sample templates
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Load one of these as a starting point, then edit it in the
              builder.
            </Typography>
          </Stack>
          <Tooltip title="Close">
            <IconButton
              onClick={onClose}
              sx={{ position: "absolute", top: 12, right: 12 }}
              aria-label="Close samples"
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
              },
              gap: 2,
            }}
          >
            {SAMPLES.map((s) => (
              <SampleCard
                key={s.id}
                sample={s}
                onLoad={requestLoad}
                hasCurrentWork={hasCurrentWork}
              />
            ))}
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(confirming)} onClose={() => setConfirming(null)}>
        <DialogTitle>Replace current canvas?</DialogTitle>
        <DialogContent>
          <Typography>
            Loading <b>{confirming?.title}</b> will replace what you have on the
            canvas. This can&rsquo;t be undone from inside the builder &mdash;
            use <b>Download JSON</b> first if you want to keep your work.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirming(null)}>Cancel</Button>
          <Button onClick={proceedConfirm} variant="contained" color="primary">
            Replace
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
