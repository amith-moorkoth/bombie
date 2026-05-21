import * as React from "react";
import { Chip } from "@mui/material";
import { makeLeafComponent } from "./Common/make-component";

const schema = [
  {
    name: "label",
    label: "Label",
    type: "text",
    group: "Content",
    span: "full",
  },
  {
    name: "variant",
    label: "Variant",
    type: "select",
    group: "Appearance",
    options: ["filled", "outlined"],
  },
  {
    name: "color",
    label: "Color",
    type: "select",
    group: "Appearance",
    options: [
      "default",
      "primary",
      "secondary",
      "success",
      "error",
      "warning",
      "info",
    ],
  },
  {
    name: "size",
    label: "Size",
    type: "select",
    group: "Appearance",
    options: ["small", "medium"],
  },
  { name: "clickable", label: "Clickable", type: "boolean", group: "Behavior" },
  {
    name: "deletable",
    label: "Show delete icon",
    type: "boolean",
    group: "Behavior",
  },
  { name: "disabled", label: "Disabled", type: "boolean", group: "State" },
];

export const UI_Chip = makeLeafComponent({
  schema,
  render: (props) => (
    <Chip
      label={props.label || "Chip"}
      variant={props.variant || "filled"}
      color={props.color || "default"}
      size={props.size || "medium"}
      clickable={props.clickable}
      disabled={props.disabled}
      onDelete={props.deletable ? () => {} : undefined}
    />
  ),
});
