import * as React from "react";
import { TextField } from "@mui/material";
import { makeLeafComponent } from "./Common/make-component";

const schema = [
  { name: "label", label: "Label", type: "text", group: "Content" },
  { name: "placeholder", label: "Placeholder", type: "text", group: "Content" },
  {
    name: "defaultValue",
    label: "Default value",
    type: "text",
    group: "Content",
  },
  {
    name: "helperText",
    label: "Helper text",
    type: "text",
    group: "Content",
    span: "full",
  },
  {
    name: "savePath",
    label: "Save path",
    type: "text",
    group: "Content",
    helper: "Form state key",
  },

  {
    name: "type",
    label: "Input type",
    type: "select",
    group: "Behavior",
    options: [
      "text",
      "password",
      "email",
      "number",
      "tel",
      "url",
      "search",
      "date",
      "time",
      "datetime-local",
    ],
  },
  {
    name: "autoComplete",
    label: "Autocomplete",
    type: "text",
    group: "Behavior",
  },
  { name: "autoFocus", label: "Autofocus", type: "boolean", group: "Behavior" },
  { name: "required", label: "Required", type: "boolean", group: "Behavior" },
  { name: "disabled", label: "Disabled", type: "boolean", group: "State" },
  { name: "readOnly", label: "Read only", type: "boolean", group: "State" },
  { name: "error", label: "Error state", type: "boolean", group: "State" },

  {
    name: "variant",
    label: "Variant",
    type: "select",
    group: "Appearance",
    options: ["outlined", "filled", "standard"],
  },
  {
    name: "size",
    label: "Size",
    type: "select",
    group: "Appearance",
    options: ["small", "medium"],
  },
  {
    name: "color",
    label: "Color",
    type: "select",
    group: "Appearance",
    options: ["primary", "secondary", "success", "error", "warning", "info"],
  },
  {
    name: "margin",
    label: "Margin",
    type: "select",
    group: "Appearance",
    options: ["none", "dense", "normal"],
  },
  {
    name: "fullWidth",
    label: "Full width",
    type: "boolean",
    group: "Appearance",
  },
  {
    name: "multiline",
    label: "Multiline",
    type: "boolean",
    group: "Appearance",
  },
  { name: "rows", label: "Rows", type: "number", group: "Appearance", min: 1 },
  {
    name: "maxRows",
    label: "Max rows",
    type: "number",
    group: "Appearance",
    min: 1,
  },
];

export const UI_TextField = makeLeafComponent({
  schema,
  render: (props) => (
    <TextField
      label={props.label}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      helperText={props.helperText}
      type={props.type || "text"}
      autoComplete={props.autoComplete}
      // eslint-disable-next-line jsx-a11y/no-autofocus -- user-configurable
      autoFocus={props.autoFocus}
      required={props.required}
      disabled={props.disabled}
      InputProps={{ readOnly: props.readOnly }}
      error={props.error}
      variant={props.variant || "outlined"}
      size={props.size || "medium"}
      color={props.color || "primary"}
      margin={props.margin || "none"}
      fullWidth={props.fullWidth}
      multiline={props.multiline}
      rows={props.multiline ? props.rows : undefined}
      maxRows={props.multiline ? props.maxRows : undefined}
    />
  ),
});
