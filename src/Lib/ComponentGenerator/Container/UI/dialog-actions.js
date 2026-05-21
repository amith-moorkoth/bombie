import * as React from "react";
import { Box } from "@mui/material";
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
    name: "gap",
    label: "Gap between actions (px)",
    type: "number",
    group: "Layout",
    min: 0,
    max: 64,
    step: 4,
  },
  {
    name: "topBorder",
    label: "Top border",
    type: "boolean",
    group: "Appearance",
    helper: "Adds a divider above the actions",
  },
];

export const UI_DialogActions = makeContainerComponent({
  schema,
  render: (props, children) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: props.alignItems || "center",
        justifyContent: props.justifyContent || "flex-end",
        gap: props.gap !== undefined ? `${Number(props.gap)}px` : "8px",
        p: props.padding !== undefined ? Number(props.padding) : 2,
        borderTop: props.topBorder ? "1px solid" : undefined,
        borderColor: "divider",
      }}
    >
      {children}
    </Box>
  ),
});
