import * as React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { makeLeafComponent } from "./Common/make-component";

const schema = [
  { name: "label", label: "Label", type: "text", group: "Content" },
  { name: "savePath", label: "Save path", type: "text", group: "Content" },
  {
    name: "options",
    label: "Options",
    type: "json",
    group: "Content",
    span: "full",
    helper: "JSON array of { label, value }",
    rows: 5,
  },
  {
    name: "defaultValue",
    label: "Default value",
    type: "text",
    group: "State",
  },
  { name: "disabled", label: "Disabled", type: "boolean", group: "State" },
  {
    name: "row",
    label: "Render in a row",
    type: "boolean",
    group: "Appearance",
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
];

function normalizeOptions(options) {
  if (!options) return [];
  if (Array.isArray(options)) return options;
  // Allow saving the raw JSON string as a fallback. PropertyPanel passes
  // parsed values, but defensive in case of stale state.
  try {
    return JSON.parse(options);
  } catch {
    return [];
  }
}

export const UI_RadioGroup = makeLeafComponent({
  schema,
  render: (props) => {
    const options = normalizeOptions(props.options);
    return (
      <FormControl disabled={props.disabled}>
        {props.label && <FormLabel>{props.label}</FormLabel>}
        <RadioGroup row={props.row} defaultValue={props.defaultValue}>
          {options.map((opt, i) => (
            <FormControlLabel
              key={opt.value ?? i}
              value={opt.value}
              label={opt.label}
              control={
                <Radio
                  color={props.color || "primary"}
                  size={props.size || "medium"}
                />
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  },
});
