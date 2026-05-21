import * as React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { makeLeafComponent } from "./Common/make-component";

const schema = [
  { name: "label", label: "Label", type: "text", group: "Content" },
  { name: "savePath", label: "Save path", type: "text", group: "Content" },
  {
    name: "helperText",
    label: "Helper text",
    type: "text",
    group: "Content",
    span: "full",
  },
  {
    name: "options",
    label: "Options",
    type: "json",
    group: "Content",
    span: "full",
    rows: 6,
    helper: "JSON array of { label, value, disabled? }",
  },
  {
    name: "defaultValue",
    label: "Default value",
    type: "text",
    group: "State",
  },

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

  { name: "required", label: "Required", type: "boolean", group: "Behavior" },
  { name: "disabled", label: "Disabled", type: "boolean", group: "State" },
  { name: "error", label: "Error state", type: "boolean", group: "State" },
  {
    name: "multiple",
    label: "Multiple selection",
    type: "boolean",
    group: "Behavior",
  },
  {
    name: "autoWidth",
    label: "Auto width",
    type: "boolean",
    group: "Behavior",
  },
  {
    name: "displayEmpty",
    label: "Display empty value",
    type: "boolean",
    group: "Behavior",
  },
];

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export const UI_SelectBox = makeLeafComponent({
  schema,
  render: (props) => {
    const options = asArray(props.options);
    return (
      <FormControl
        size={props.size || "medium"}
        variant={props.variant || "outlined"}
        color={props.color || "primary"}
        margin={props.margin || "none"}
        required={props.required}
        disabled={props.disabled}
        error={props.error}
        fullWidth={props.fullWidth}
      >
        {props.label && <InputLabel>{props.label}</InputLabel>}
        <Select
          label={props.label}
          defaultValue={
            props.multiple
              ? Array.isArray(props.defaultValue)
                ? props.defaultValue
                : []
              : (props.defaultValue ?? "")
          }
          multiple={Boolean(props.multiple)}
          autoWidth={Boolean(props.autoWidth)}
          displayEmpty={Boolean(props.displayEmpty)}
        >
          {options.map((opt, i) => {
            const value = opt?.value ?? opt;
            const label = opt?.label ?? String(opt);
            return (
              <MenuItem key={value ?? i} value={value} disabled={opt?.disabled}>
                {label}
              </MenuItem>
            );
          })}
        </Select>
        {props.helperText && (
          <FormHelperText>{props.helperText}</FormHelperText>
        )}
      </FormControl>
    );
  },
});
