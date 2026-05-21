import * as React from "react";
import { Alert, AlertTitle } from "@mui/material";
import { makeLeafComponent } from "./Common/make-component";

const schema = [
  { name: "title", label: "Title", type: "text", group: "Content" },
  {
    name: "message",
    label: "Message",
    type: "text",
    group: "Content",
    span: "full",
    multiline: true,
    rows: 3,
  },
  {
    name: "severity",
    label: "Severity",
    type: "select",
    group: "Appearance",
    options: ["info", "success", "warning", "error"],
  },
  {
    name: "variant",
    label: "Variant",
    type: "select",
    group: "Appearance",
    options: ["standard", "filled", "outlined"],
  },
  {
    name: "color",
    label: "Override color",
    type: "select",
    group: "Appearance",
    options: ["info", "success", "warning", "error"],
  },
  { name: "closable", label: "Closable", type: "boolean", group: "Behavior" },
];

export const UI_Alert = makeLeafComponent({
  schema,
  render: (props) => (
    <Alert
      severity={props.severity || "info"}
      variant={props.variant || "standard"}
      color={props.color || undefined}
      onClose={props.closable ? () => {} : undefined}
    >
      {props.title && <AlertTitle>{props.title}</AlertTitle>}
      {props.message || "This is an alert."}
    </Alert>
  ),
});
