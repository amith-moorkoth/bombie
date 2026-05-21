import * as React from "react";
import { CircularProgress } from "@mui/material";
import { makeLeafComponent } from "./Common/make-component";

const schema = [
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
    name: "variant",
    label: "Variant",
    type: "select",
    group: "Behavior",
    options: ["determinate", "indeterminate"],
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
  {
    name: "size",
    label: "Size (px)",
    type: "number",
    group: "Appearance",
    min: 16,
    max: 200,
    step: 4,
  },
  {
    name: "thickness",
    label: "Thickness",
    type: "number",
    group: "Appearance",
    min: 1,
    max: 20,
    step: 0.5,
  },
  {
    name: "disableShrink",
    label: "Disable shrink",
    type: "boolean",
    group: "Behavior",
  },
];

export const UI_CircularProgress = makeLeafComponent({
  schema,
  render: (props) => (
    <CircularProgress
      variant={props.variant || "indeterminate"}
      value={props.value ?? 0}
      color={props.color || "primary"}
      size={props.size || 40}
      thickness={props.thickness || 3.6}
      disableShrink={props.disableShrink}
    />
  ),
});
