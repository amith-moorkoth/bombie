import * as React from "react";
import { Card } from "@mui/material";
import { makeContainerComponent } from "./Common/make-component";

const schema = [
  {
    name: "variant",
    label: "Variant",
    type: "select",
    group: "Appearance",
    options: ["elevation", "outlined"],
  },
  {
    name: "elevation",
    label: "Elevation",
    type: "number",
    group: "Appearance",
    min: 0,
    max: 24,
    helper: "0-24, only with variant=elevation",
  },
  {
    name: "raised",
    label: "Raised",
    type: "boolean",
    group: "Appearance",
    helper: "Extra shadow when variant=elevation",
  },
  {
    name: "square",
    label: "Square corners",
    type: "boolean",
    group: "Appearance",
  },
  {
    name: "maxWidth",
    label: "Max width (px)",
    type: "number",
    group: "Layout",
    min: 120,
    max: 1600,
    step: 20,
    helper: "Centers the card when set",
  },
  {
    name: "padding",
    label: "Inner padding",
    type: "number",
    group: "Layout",
    min: 0,
    max: 8,
    step: 1,
    helper: "Theme spacing units (multiplied by 8px)",
  },
  {
    name: "bgcolor",
    label: "Background",
    type: "select",
    group: "Appearance",
    options: [
      "background.paper",
      "background.default",
      "primary.main",
      "primary.light",
      "primary.dark",
      "secondary.main",
      "success.main",
      "warning.main",
      "error.main",
      "info.main",
      "grey.50",
      "grey.100",
      "grey.200",
    ],
  },
];

export const UI_Card = makeContainerComponent({
  schema,
  render: (props, children) => (
    <Card
      variant={props.variant || "elevation"}
      elevation={
        props.elevation !== undefined ? Number(props.elevation) : undefined
      }
      raised={props.raised}
      square={props.square}
      sx={{
        width: "100%",
        maxWidth: props.maxWidth || undefined,
        mx: props.maxWidth ? "auto" : undefined,
        p: props.padding !== undefined ? Number(props.padding) : undefined,
        bgcolor: props.bgcolor || undefined,
        borderRadius: 2,
      }}
    >
      {children}
    </Card>
  ),
});
