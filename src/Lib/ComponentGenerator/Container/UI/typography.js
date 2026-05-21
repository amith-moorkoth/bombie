import * as React from "react";
import { Typography } from "@mui/material";
import { makeLeafComponent } from "./Common/make-component";

const VARIANTS = [
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
];

const schema = [
  {
    name: "text",
    label: "Text",
    type: "text",
    group: "Content",
    span: "full",
    multiline: true,
    rows: 3,
    placeholder: "Heading or paragraph text",
  },
  {
    name: "variant",
    label: "Variant",
    type: "select",
    group: "Appearance",
    options: VARIANTS,
  },
  {
    name: "component",
    label: "Render as",
    type: "select",
    group: "Appearance",
    options: ["p", "span", "div", "h1", "h2", "h3", "h4", "h5", "h6", "label"],
  },
  {
    name: "color",
    label: "Color",
    type: "select",
    group: "Appearance",
    options: [
      "text.primary",
      "text.secondary",
      "primary",
      "secondary",
      "error",
      "warning",
      "info",
      "success",
    ],
  },
  {
    name: "align",
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
    name: "gutterBottom",
    label: "Gutter bottom",
    type: "boolean",
    group: "Spacing",
  },
  { name: "noWrap", label: "No wrap", type: "boolean", group: "Layout" },
];

export const UI_Typography = makeLeafComponent({
  schema,
  render: (props) => (
    <Typography
      variant={props.variant || "body1"}
      component={props.component || undefined}
      color={props.color || undefined}
      align={props.align || "inherit"}
      gutterBottom={props.gutterBottom}
      noWrap={props.noWrap}
      sx={{
        fontWeight: props.fontWeight ? Number(props.fontWeight) : undefined,
      }}
    >
      {props.text || "Typography text"}
    </Typography>
  ),
});
