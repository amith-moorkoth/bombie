import * as React from "react";
import {
  Box,
  Button,
  CardHeader,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { makeContainerComponent } from "./Common/make-component";

const MAX_WIDTH_OPTIONS = ["xs", "sm", "md", "lg", "xl", "false"];

const schema = [
  {
    name: "dialogTitle",
    label: "Title",
    type: "text",
    group: "Content",
    span: "full",
  },
  {
    name: "dialogSubheader",
    label: "Subtitle",
    type: "text",
    group: "Content",
    span: "full",
  },

  {
    name: "triggerLabel",
    label: "Trigger button label",
    type: "text",
    group: "Trigger button",
    span: "full",
    helper: "Label of the button that opens the dialog in preview",
  },
  {
    name: "triggerVariant",
    label: "Trigger variant",
    type: "select",
    group: "Trigger button",
    options: ["text", "outlined", "contained"],
  },
  {
    name: "triggerColor",
    label: "Trigger color",
    type: "select",
    group: "Trigger button",
    options: [
      "primary",
      "secondary",
      "success",
      "error",
      "warning",
      "info",
      "inherit",
    ],
  },
  {
    name: "triggerSize",
    label: "Trigger size",
    type: "select",
    group: "Trigger button",
    options: ["small", "medium", "large"],
  },

  {
    name: "maxWidth",
    label: "Max width",
    type: "select",
    group: "Sizing",
    options: MAX_WIDTH_OPTIONS,
    helper: "MUI breakpoint key, or 'false' for unconstrained",
  },
  { name: "fullWidth", label: "Full width", type: "boolean", group: "Sizing" },
  {
    name: "fullScreen",
    label: "Full screen",
    type: "boolean",
    group: "Sizing",
  },
  {
    name: "scroll",
    label: "Scroll",
    type: "select",
    group: "Behavior",
    options: ["paper", "body"],
    helper: "Where scrolling happens when content overflows",
  },

  {
    name: "openByDefault",
    label: "Open by default in preview",
    type: "boolean",
    group: "Behavior",
    helper: "Useful when iterating on the dialog content",
  },
  {
    name: "disableEscapeKeyDown",
    label: "Disable Esc key",
    type: "boolean",
    group: "Behavior",
  },
  {
    name: "disableBackdropClick",
    label: "Disable backdrop click",
    type: "boolean",
    group: "Behavior",
  },

  {
    name: "padding",
    label: "Title padding",
    type: "number",
    group: "Layout",
    min: 0,
    max: 8,
    step: 0.5,
  },
  {
    name: "elevation",
    label: "Elevation",
    type: "number",
    group: "Appearance",
    min: 0,
    max: 24,
    helper: "Paper depth (0-24)",
  },
  {
    name: "transitionDuration",
    label: "Transition (ms)",
    type: "number",
    group: "Behavior",
    min: 0,
    max: 1000,
    step: 50,
  },
];

/**
 * Builder canvas: we render the dialog as a flat Paper preceded by a
 * disabled trigger-button preview, so the user can both see *what the
 * trigger looks like* AND edit the dialog body directly. The real modal
 * behaviour (click to open, Esc/backdrop to close) lives in the live
 * preview (see render-preview.js → DIALOG).
 */
export const UI_Dialog = makeContainerComponent({
  schema,
  render: (props, children) => (
    <Stack spacing={2}>
      <Box>
        <Button
          variant={props.triggerVariant || "contained"}
          color={props.triggerColor || "primary"}
          size={props.triggerSize || "medium"}
          startIcon={<OpenInNewOutlinedIcon />}
          disableRipple
          sx={{ pointerEvents: "none", alignSelf: "flex-start" }}
        >
          {props.triggerLabel || props.dialogTitle || "Open dialog"}
        </Button>
        <Chip
          size="small"
          label="opens the dialog below in preview"
          sx={{ ml: 1, fontSize: 10 }}
          variant="outlined"
        />
      </Box>

      <Paper
        variant={props.elevation === 0 ? "outlined" : "elevation"}
        elevation={props.elevation !== undefined ? Number(props.elevation) : 8}
        sx={{
          width: "100%",
          maxWidth: props.fullScreen ? "100%" : 600,
          mx: "auto",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {props.dialogTitle && (
          <CardHeader
            title={props.dialogTitle}
            subheader={props.dialogSubheader}
            sx={{
              p:
                props.padding !== undefined ? Number(props.padding) : undefined,
            }}
          />
        )}
        <Box>{children}</Box>
        <Typography
          variant="caption"
          color="text.disabled"
          sx={{
            display: "block",
            textAlign: "center",
            py: 0.5,
            fontSize: 10,
          }}
        >
          Dialog body · click the trigger in preview to open as a real modal
        </Typography>
      </Paper>
    </Stack>
  ),
});
