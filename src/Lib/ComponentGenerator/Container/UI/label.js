import * as React from "react";
import { Typography } from "@mui/material";
import { makeLeafComponent } from "./Common/make-component";

const schema = [
  {
    name: "label",
    label: "Text",
    type: "text",
    group: "Content",
    span: "full",
  },
  { name: "savePath", label: "Save path", type: "text", group: "Content" },

  {
    name: "variant",
    label: "Variant",
    type: "select",
    group: "Appearance",
    options: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "subtitle1",
      "subtitle2",
      "body1",
      "body2",
      "caption",
      "overline",
      "button",
    ],
  },
  {
    name: "component",
    label: "Render as",
    type: "select",
    group: "Appearance",
    options: ["span", "div", "p", "label", "h1", "h2", "h3", "h4", "h5", "h6"],
  },
  {
    name: "color",
    label: "Color",
    type: "select",
    group: "Appearance",
    options: [
      "text.primary",
      "text.secondary",
      "text.disabled",
      "primary",
      "secondary",
      "success",
      "warning",
      "error",
      "info",
    ],
  },
  {
    name: "textAlign",
    label: "Align",
    type: "select",
    group: "Appearance",
    options: ["inherit", "left", "center", "right", "justify"],
  },
  {
    name: "fontWeight",
    label: "Font weight",
    type: "select",
    group: "Appearance",
    options: ["300", "400", "500", "600", "700", "800"],
  },
  {
    name: "fontStyle",
    label: "Font style",
    type: "select",
    group: "Appearance",
    options: ["normal", "italic", "oblique"],
  },
  {
    name: "textTransform",
    label: "Text transform",
    type: "select",
    group: "Appearance",
    options: ["none", "capitalize", "uppercase", "lowercase"],
  },

  {
    name: "gutterBottom",
    label: "Gutter bottom",
    type: "boolean",
    group: "Spacing",
  },
  {
    name: "noWrap",
    label: "No wrap (ellipsis)",
    type: "boolean",
    group: "Layout",
  },
];

export const UI_Label = makeLeafComponent({
  schema,
  render: (props) => (
    <Typography
      variant={props.variant || "body1"}
      component={props.component || undefined}
      color={props.color || undefined}
      gutterBottom={props.gutterBottom}
      noWrap={props.noWrap}
      sx={{
        textAlign: props.textAlign || undefined,
        fontWeight: props.fontWeight ? Number(props.fontWeight) : undefined,
        fontStyle: props.fontStyle || undefined,
        textTransform: props.textTransform || undefined,
      }}
    >
      {props.label || "Label"}
    </Typography>
  ),
});
