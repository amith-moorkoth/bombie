import * as React from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { makeLeafComponent } from "./Common/make-component";

const schema = [
  { name: "label", label: "Label", type: "text", group: "Content" },
  {
    name: "savePath",
    label: "Save path",
    type: "text",
    group: "Content",
    helper: "Form state key",
  },
  {
    name: "defaultChecked",
    label: "Default checked",
    type: "boolean",
    group: "State",
  },
  { name: "disabled", label: "Disabled", type: "boolean", group: "State" },
  { name: "required", label: "Required", type: "boolean", group: "State" },
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
      "default",
    ],
  },
  {
    name: "size",
    label: "Size",
    type: "select",
    group: "Appearance",
    options: ["small", "medium"],
  },
  {
    name: "labelPlacement",
    label: "Label placement",
    type: "select",
    group: "Appearance",
    options: ["end", "start", "top", "bottom"],
  },
];

export const UI_Switch = makeLeafComponent({
  schema,
  render: (props) => (
    <FormControlLabel
      label={props.label || ""}
      labelPlacement={props.labelPlacement || "end"}
      disabled={props.disabled}
      required={props.required}
      control={
        <Switch
          defaultChecked={props.defaultChecked}
          color={props.color || "primary"}
          size={props.size || "medium"}
          disabled={props.disabled}
        />
      }
    />
  ),
});
