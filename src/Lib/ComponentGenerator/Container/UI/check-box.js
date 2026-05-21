import * as React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { makeLeafComponent } from "./Common/make-component";

const schema = [
  { name: "label", label: "Label", type: "text", group: "Content" },
  { name: "savePath", label: "Save path", type: "text", group: "Content" },
  {
    name: "defaultChecked",
    label: "Default checked",
    type: "boolean",
    group: "State",
  },
  {
    name: "indeterminate",
    label: "Indeterminate",
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
  {
    name: "disableRipple",
    label: "Disable ripple",
    type: "boolean",
    group: "Appearance",
  },
];

export const UI_CheckBox = makeLeafComponent({
  schema,
  render: (props) => (
    <FormControlLabel
      label={props.label || ""}
      labelPlacement={props.labelPlacement || "end"}
      disabled={props.disabled}
      required={props.required}
      control={
        <Checkbox
          defaultChecked={props.defaultChecked}
          indeterminate={props.indeterminate}
          disabled={props.disabled}
          color={props.color || "primary"}
          size={props.size || "medium"}
          disableRipple={props.disableRipple}
        />
      }
    />
  ),
});
