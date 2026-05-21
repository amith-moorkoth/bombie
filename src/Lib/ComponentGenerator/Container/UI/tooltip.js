import * as React from "react";
import { Tooltip, Chip } from "@mui/material";
import { makeLeafComponent } from "./Common/make-component";

const schema = [
  {
    name: "title",
    label: "Tooltip text",
    type: "text",
    group: "Content",
    span: "full",
  },
  {
    name: "label",
    label: "Wrapped label",
    type: "text",
    group: "Content",
    helper: "Inline preview of what's wrapped",
  },
  {
    name: "placement",
    label: "Placement",
    type: "select",
    group: "Appearance",
    options: [
      "top",
      "right",
      "bottom",
      "left",
      "top-start",
      "top-end",
      "right-start",
      "right-end",
      "bottom-start",
      "bottom-end",
      "left-start",
      "left-end",
    ],
  },
  { name: "arrow", label: "Show arrow", type: "boolean", group: "Appearance" },
  {
    name: "open",
    label: "Always open",
    type: "boolean",
    group: "Behavior",
    helper: "Useful for preview; controlled in runtime app",
  },
  {
    name: "enterDelay",
    label: "Enter delay (ms)",
    type: "number",
    group: "Behavior",
  },
  {
    name: "leaveDelay",
    label: "Leave delay (ms)",
    type: "number",
    group: "Behavior",
  },
];

// Tooltip needs a single DOM child anchor — render the wrapped label as a
// Chip placeholder so the builder visualises the bound element.
export const UI_Tooltip = makeLeafComponent({
  schema,
  render: (props) => (
    <Tooltip
      title={props.title || "Tooltip text"}
      placement={props.placement || "top"}
      arrow={props.arrow}
      open={props.open || undefined}
      enterDelay={props.enterDelay}
      leaveDelay={props.leaveDelay}
    >
      <Chip variant="outlined" label={props.label || "Hover me"} />
    </Tooltip>
  ),
});
