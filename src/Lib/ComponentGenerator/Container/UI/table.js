import * as React from "react";
import { Box, Typography } from "@mui/material";
import { makeContainerComponent } from "./Common/make-component";

const schema = [
  {
    name: "size",
    label: "Size",
    type: "select",
    group: "Appearance",
    options: ["small", "medium"],
  },
  {
    name: "padding",
    label: "Cell padding",
    type: "select",
    group: "Appearance",
    options: ["normal", "checkbox", "none"],
  },
  {
    name: "stickyHeader",
    label: "Sticky header",
    type: "boolean",
    group: "Behavior",
    helper: "Header sticks while body scrolls (runtime)",
  },
  {
    name: "minWidth",
    label: "Min width (px)",
    type: "number",
    group: "Layout",
    min: 0,
    max: 1600,
    step: 20,
  },
  {
    name: "maxHeight",
    label: "Max height (px)",
    type: "number",
    group: "Layout",
    min: 100,
    max: 1000,
    step: 20,
    helper: "Required with sticky header for scrolling",
  },
  {
    name: "elevation",
    label: "Container elevation",
    type: "number",
    group: "Appearance",
    min: 0,
    max: 24,
  },
  {
    name: "variant",
    label: "Container variant",
    type: "select",
    group: "Appearance",
    options: ["elevation", "outlined"],
  },
];

/**
 * Builder-mode Table renders as a bordered Box so users see "this is a table
 * area" and can drop TableHeader / TableBody into it. The preview renderer
 * uses a real <Table>/<TableHead>/<TableBody> tree (no DropBox interference).
 */
export const UI_Table = makeContainerComponent({
  schema,
  render: (props, children) => (
    <Box
      sx={{
        width: "100%",
        minWidth: props.minWidth || undefined,
        maxHeight: props.maxHeight || undefined,
        overflow: "auto",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="caption"
        sx={{
          display: "block",
          px: 1.5,
          py: 0.5,
          bgcolor: "grey.100",
          color: "text.secondary",
          fontWeight: 600,
        }}
      >
        Table · size: {props.size || "medium"}
        {props.stickyHeader ? " · sticky header" : ""}
      </Typography>
      {children}
    </Box>
  ),
});
