import * as React from "react";
import { CardContent } from "@mui/material";
import { makeContainerComponent } from "./Common/make-component";

const schema = [
  {
    name: "padding",
    label: "Padding",
    type: "number",
    group: "Layout",
    min: 0,
    max: 8,
    step: 0.5,
    helper: "Theme spacing units (multiplied by 8px)",
  },
  {
    name: "removeLastChildPadding",
    label: "Remove last-child bottom padding",
    type: "boolean",
    group: "Layout",
    helper: "Useful when this is the last section in a card",
  },
  {
    name: "bgcolor",
    label: "Background",
    type: "select",
    group: "Appearance",
    options: [
      "transparent",
      "background.paper",
      "background.default",
      "grey.50",
      "grey.100",
      "primary.50",
    ],
  },
];

export const UI_CardContent = makeContainerComponent({
  schema,
  render: (props, children) => (
    <CardContent
      sx={{
        p: props.padding !== undefined ? Number(props.padding) : undefined,
        bgcolor: props.bgcolor || undefined,
        "&:last-child": props.removeLastChildPadding ? { pb: 0 } : undefined,
      }}
    >
      {children}
    </CardContent>
  ),
});
