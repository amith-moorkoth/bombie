import * as React from "react";
import { CardActions } from "@mui/material";
import { makeContainerComponent } from "./Common/make-component";

const schema = [
  {
    name: "justifyContent",
    label: "Justify content",
    type: "select",
    group: "Layout",
    options: [
      "flex-start",
      "flex-end",
      "center",
      "space-between",
      "space-around",
      "space-evenly",
    ],
  },
  {
    name: "alignItems",
    label: "Align items",
    type: "select",
    group: "Layout",
    options: ["flex-start", "flex-end", "center", "baseline", "stretch"],
  },
  {
    name: "padding",
    label: "Padding",
    type: "number",
    group: "Layout",
    min: 0,
    max: 8,
    step: 0.5,
  },
  {
    name: "spacing",
    label: "Spacing between actions (px)",
    type: "number",
    group: "Layout",
    min: 0,
    max: 64,
    step: 4,
  },
  {
    name: "disableSpacing",
    label: "Disable default spacing",
    type: "boolean",
    group: "Layout",
    helper: "Removes MUI's default 8px between buttons",
  },
];

export const UI_CardAction = makeContainerComponent({
  schema,
  render: (props, children) => (
    <CardActions
      disableSpacing={props.disableSpacing}
      sx={{
        p: props.padding !== undefined ? Number(props.padding) : undefined,
        justifyContent: props.justifyContent || "flex-end",
        alignItems: props.alignItems || undefined,
        gap:
          props.spacing !== undefined
            ? `${Number(props.spacing)}px`
            : undefined,
      }}
    >
      {children}
    </CardActions>
  ),
});
