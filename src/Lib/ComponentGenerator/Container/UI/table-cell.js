import * as React from "react";
import { Box } from "@mui/material";
import { makeContainerComponent } from "./Common/make-component";

const schema = [
  {
    name: "text",
    label: "Static text",
    type: "text",
    group: "Content",
    span: "full",
    helper: "Plain text shown when no child component is dropped",
  },
  {
    name: "align",
    label: "Text align",
    type: "select",
    group: "Appearance",
    options: ["inherit", "left", "center", "right", "justify"],
  },
  {
    name: "padding",
    label: "Padding",
    type: "select",
    group: "Appearance",
    options: ["normal", "checkbox", "none"],
  },
  {
    name: "fontWeight",
    label: "Font weight",
    type: "select",
    group: "Appearance",
    options: ["400", "500", "600", "700"],
  },
  {
    name: "width",
    label: "Width (px)",
    type: "number",
    group: "Layout",
    min: 0,
    max: 600,
    step: 10,
  },
  {
    name: "minWidth",
    label: "Min width (px)",
    type: "number",
    group: "Layout",
    min: 0,
    max: 400,
    step: 10,
  },
  {
    name: "bgcolor",
    label: "Background",
    type: "select",
    group: "Appearance",
    options: [
      "transparent",
      "grey.50",
      "primary.50",
      "warning.50",
      "error.50",
      "success.50",
    ],
  },
  {
    name: "header",
    label: "Header cell",
    type: "boolean",
    group: "Semantics",
    helper: "Renders bold; uses <th> in preview",
  },
];

const paddingMap = { normal: 1.5, none: 0, checkbox: 0.5 };

/**
 * Builder-mode TableCell: a flex item inside a TableRow. Preview renders a
 * real <TableCell> with the right align/padding/scope.
 */
export const UI_TableCell = makeContainerComponent({
  schema,
  render: (props, children) => {
    const padKey = props.padding || "normal";
    return (
      <Box
        sx={{
          flex: props.width ? `0 0 ${props.width}px` : 1,
          minWidth: props.minWidth || undefined,
          width: props.width || undefined,
          p: paddingMap[padKey] ?? 1.5,
          textAlign: props.align || "left",
          fontWeight: props.fontWeight
            ? Number(props.fontWeight)
            : props.header
              ? 600
              : 400,
          bgcolor: props.bgcolor || undefined,
          borderRight: "1px solid",
          borderColor: "divider",
          "&:last-of-type": { borderRight: "none" },
        }}
      >
        {children}
        {props.text && !React.Children.count(children) ? props.text : null}
      </Box>
    );
  },
});
