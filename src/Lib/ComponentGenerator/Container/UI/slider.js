import * as React from "react";
import { Box, Slider, Typography } from "@mui/material";
import { makeLeafComponent } from "./Common/make-component";

const schema = [
  { name: "label", label: "Label", type: "text", group: "Content" },
  { name: "savePath", label: "Save path", type: "text", group: "Content" },
  {
    name: "defaultValue",
    label: "Default value",
    type: "number",
    group: "Value",
  },
  { name: "min", label: "Min", type: "number", group: "Value" },
  { name: "max", label: "Max", type: "number", group: "Value" },
  { name: "step", label: "Step", type: "number", group: "Value" },
  {
    name: "valueLabelDisplay",
    label: "Value label",
    type: "select",
    group: "Appearance",
    options: ["auto", "on", "off"],
  },
  { name: "marks", label: "Show marks", type: "boolean", group: "Appearance" },
  {
    name: "color",
    label: "Color",
    type: "select",
    group: "Appearance",
    options: ["primary", "secondary", "success", "error", "warning", "info"],
  },
  {
    name: "size",
    label: "Size",
    type: "select",
    group: "Appearance",
    options: ["small", "medium"],
  },
  {
    name: "orientation",
    label: "Orientation",
    type: "select",
    group: "Appearance",
    options: ["horizontal", "vertical"],
  },
  { name: "disabled", label: "Disabled", type: "boolean", group: "State" },
];

export const UI_Slider = makeLeafComponent({
  schema,
  render: (props) => (
    <Box sx={{ minWidth: 200, px: 1 }}>
      {props.label && (
        <Typography variant="body2" gutterBottom>
          {props.label}
        </Typography>
      )}
      <Slider
        defaultValue={props.defaultValue ?? 50}
        min={props.min ?? 0}
        max={props.max ?? 100}
        step={props.step ?? 1}
        marks={props.marks}
        valueLabelDisplay={props.valueLabelDisplay || "auto"}
        color={props.color || "primary"}
        size={props.size || "medium"}
        orientation={props.orientation || "horizontal"}
        disabled={props.disabled}
        sx={{
          height: props.orientation === "vertical" ? 200 : undefined,
        }}
      />
    </Box>
  ),
});
