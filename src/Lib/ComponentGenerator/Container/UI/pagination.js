import * as React from "react";
import { Pagination } from "@mui/material";
import { makeLeafComponent } from "./Common/make-component";

const schema = [
  {
    name: "count",
    label: "Page count",
    type: "number",
    group: "Content",
    min: 1,
    max: 1000,
  },
  {
    name: "defaultPage",
    label: "Default page",
    type: "number",
    group: "State",
    min: 1,
  },
  {
    name: "siblingCount",
    label: "Sibling count",
    type: "number",
    group: "Behavior",
    min: 0,
    max: 5,
  },
  {
    name: "boundaryCount",
    label: "Boundary count",
    type: "number",
    group: "Behavior",
    min: 0,
    max: 5,
  },
  {
    name: "color",
    label: "Color",
    type: "select",
    group: "Appearance",
    options: ["primary", "secondary", "standard"],
  },
  {
    name: "variant",
    label: "Variant",
    type: "select",
    group: "Appearance",
    options: ["text", "outlined"],
  },
  {
    name: "shape",
    label: "Shape",
    type: "select",
    group: "Appearance",
    options: ["circular", "rounded"],
  },
  {
    name: "size",
    label: "Size",
    type: "select",
    group: "Appearance",
    options: ["small", "medium", "large"],
  },
  {
    name: "showFirstButton",
    label: "Show first button",
    type: "boolean",
    group: "Behavior",
  },
  {
    name: "showLastButton",
    label: "Show last button",
    type: "boolean",
    group: "Behavior",
  },
  { name: "disabled", label: "Disabled", type: "boolean", group: "State" },
];

export const UI_Pagination = makeLeafComponent({
  schema,
  render: (props) => (
    <Pagination
      count={props.count ?? 10}
      defaultPage={props.defaultPage ?? 1}
      siblingCount={props.siblingCount ?? 1}
      boundaryCount={props.boundaryCount ?? 1}
      color={props.color || "primary"}
      variant={props.variant || "text"}
      shape={props.shape || "circular"}
      size={props.size || "medium"}
      showFirstButton={props.showFirstButton}
      showLastButton={props.showLastButton}
      disabled={props.disabled}
    />
  ),
});
