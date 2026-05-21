import * as React from "react";
import { Button } from "@mui/material";
import { makeLeafComponent } from "./Common/make-component";

const schema = [
  {
    name: "label",
    label: "Label",
    type: "text",
    group: "Content",
    placeholder: "Click me",
  },
  {
    name: "savePath",
    label: "Save path",
    type: "text",
    group: "Content",
    helper: "Form state key",
  },
  {
    name: "variant",
    label: "Variant",
    type: "select",
    group: "Appearance",
    options: ["text", "outlined", "contained"],
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
    label: "Size",
    type: "select",
    group: "Appearance",
    options: ["small", "medium", "large"],
  },
  {
    name: "fullWidth",
    label: "Full width",
    type: "boolean",
    group: "Appearance",
  },
  { name: "disabled", label: "Disabled", type: "boolean", group: "State" },
  {
    name: "disableElevation",
    label: "Disable elevation",
    type: "boolean",
    group: "Appearance",
  },
  {
    name: "disableRipple",
    label: "Disable ripple",
    type: "boolean",
    group: "Appearance",
  },
  {
    name: "href",
    label: "Href",
    type: "text",
    group: "Behavior",
    helper: "Renders as an <a>",
  },
  {
    name: "target",
    label: "Target",
    type: "select",
    group: "Behavior",
    options: ["_self", "_blank", "_parent", "_top"],
  },
];

export const UI_Button = makeLeafComponent({
  schema,
  render: (props) => (
    <Button
      variant={props.variant || "contained"}
      color={props.color || "primary"}
      size={props.size || "medium"}
      fullWidth={props.fullWidth}
      disabled={props.disabled}
      disableElevation={props.disableElevation}
      disableRipple={props.disableRipple}
      href={props.href}
      target={props.target}
    >
      {props.label || "Button"}
    </Button>
  ),
});
