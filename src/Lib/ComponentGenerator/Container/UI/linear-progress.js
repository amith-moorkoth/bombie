import * as React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { makeLeafComponent } from "./Common/make-component";

const schema = [
  { name: "label", label: "Label", type: "text", group: "Content" },
  {
    name: "value",
    label: "Value",
    type: "number",
    group: "Value",
    min: 0,
    max: 100,
    helper: "Only used when variant = determinate",
  },
  {
    name: "valueBuffer",
    label: "Buffer value",
    type: "number",
    group: "Value",
    min: 0,
    max: 100,
    helper: "Only used when variant = buffer",
  },
  {
    name: "variant",
    label: "Variant",
    type: "select",
    group: "Behavior",
    options: ["determinate", "indeterminate", "buffer", "query"],
  },
  {
    name: "color",
    label: "Color",
    type: "select",
    group: "Appearance",
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
];

export const UI_LinearProgress = makeLeafComponent({
  schema,
  render: (props) => (
    <Box sx={{ minWidth: 220 }}>
      {props.label && (
        <Typography variant="caption" color="text.secondary">
          {props.label}
        </Typography>
      )}
      <LinearProgress
        variant={props.variant || "indeterminate"}
        value={props.value ?? 0}
        valueBuffer={props.valueBuffer ?? 0}
        color={props.color || "primary"}
      />
    </Box>
  ),
});
