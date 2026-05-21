import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { makeLeafComponent } from "./Common/make-component";

const schema = [
  { name: "label", label: "Label", type: "text", group: "Content" },
  { name: "placeholder", label: "Placeholder", type: "text", group: "Content" },
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
    helper: "JSON array of strings or { label, value }",
  },
  {
    name: "optionsURL",
    label: "Options URL",
    type: "text",
    group: "Content",
    span: "full",
    helper: "Fetch options from this URL at runtime (not used in preview)",
  },
  {
    name: "getOptionLabel",
    label: "Option label key",
    type: "text",
    group: "Content",
    helper: "Dot path to read each option's label, e.g. 'label' or 'name'",
  },

  {
    name: "freeSolo",
    label: "Free solo",
    type: "boolean",
    group: "Behavior",
    helper: "Allow values not in the options list",
  },
  {
    name: "multiple",
    label: "Multiple selection",
    type: "boolean",
    group: "Behavior",
  },
  {
    name: "disableClearable",
    label: "Disable clear icon",
    type: "boolean",
    group: "Behavior",
  },
  {
    name: "autoHighlight",
    label: "Auto-highlight first",
    type: "boolean",
    group: "Behavior",
  },
  {
    name: "openOnFocus",
    label: "Open on focus",
    type: "boolean",
    group: "Behavior",
  },
  {
    name: "blurOnSelect",
    label: "Blur on select",
    type: "boolean",
    group: "Behavior",
  },
  {
    name: "selectOnFocus",
    label: "Select on focus",
    type: "boolean",
    group: "Behavior",
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
    name: "fullWidth",
    label: "Full width",
    type: "boolean",
    group: "Appearance",
  },
  { name: "disabled", label: "Disabled", type: "boolean", group: "State" },
  { name: "required", label: "Required", type: "boolean", group: "State" },
  { name: "error", label: "Error state", type: "boolean", group: "State" },
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

function resolvePath(obj, path) {
  if (!path) return undefined;
  return path
    .split(".")
    .reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

export const UI_Autocomplete = makeLeafComponent({
  schema,
  render: (props) => {
    const options = asArray(props.options);
    return (
      <Autocomplete
        disablePortal
        options={options}
        size={props.size || "medium"}
        fullWidth={props.fullWidth}
        disabled={props.disabled}
        freeSolo={Boolean(props.freeSolo)}
        multiple={Boolean(props.multiple)}
        disableClearable={Boolean(props.disableClearable)}
        autoHighlight={Boolean(props.autoHighlight)}
        openOnFocus={Boolean(props.openOnFocus)}
        blurOnSelect={Boolean(props.blurOnSelect)}
        selectOnFocus={Boolean(props.selectOnFocus)}
        getOptionLabel={(option) => {
          if (typeof option === "string") return option;
          if (props.getOptionLabel) {
            const v = resolvePath(option, props.getOptionLabel);
            return v != null ? String(v) : "";
          }
          return option?.label ?? "";
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.label}
            placeholder={props.placeholder}
            helperText={props.helperText}
            variant={props.variant || "outlined"}
            required={props.required}
            error={props.error}
          />
        )}
      />
    );
  },
});
