import * as React from "react";
import { Box, Typography } from "@mui/material";
import { makeContainerComponent } from "./Common/make-component";

const schema = [
  {
    name: "dialogContentText",
    label: "Content text",
    type: "text",
    group: "Content",
    span: "full",
    multiline: true,
    rows: 3,
    helper: "Short description shown above the dropped children",
  },
  {
    name: "padding",
    label: "Padding",
    type: "number",
    group: "Layout",
    min: 0,
    max: 8,
    step: 0.5,
  },
  {
    name: "dividers",
    label: "Top + bottom dividers",
    type: "boolean",
    group: "Appearance",
    helper: "MUI scroll-friendly dividers",
  },
  {
    name: "bgcolor",
    label: "Background",
    type: "select",
    group: "Appearance",
    options: ["transparent", "background.paper", "grey.50", "grey.100"],
  },
];

export const UI_DialogContent = makeContainerComponent({
  schema,
  render: (props, children) => (
    <Box
      sx={{
        p: props.padding !== undefined ? Number(props.padding) : 2,
        bgcolor: props.bgcolor || undefined,
        borderTop: props.dividers ? "1px solid" : undefined,
        borderBottom: props.dividers ? "1px solid" : undefined,
        borderColor: "divider",
      }}
    >
      {props.dialogContentText && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, whiteSpace: "pre-wrap" }}
        >
          {props.dialogContentText}
        </Typography>
      )}
      {children}
    </Box>
  ),
});
