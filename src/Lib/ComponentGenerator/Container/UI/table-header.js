import * as React from "react";
import { Box } from "@mui/material";
import { makeContainerComponent } from "./Common/make-component";

const schema = [
  {
    name: "bgcolor",
    label: "Background",
    type: "select",
    group: "Appearance",
    options: [
      "grey.100",
      "grey.200",
      "primary.50",
      "primary.100",
      "background.default",
      "transparent",
    ],
  },
  {
    name: "borderBottom",
    label: "Bottom divider",
    type: "boolean",
    group: "Appearance",
  },
];

/**
 * Builder-mode TableHeader: a horizontal row container styled like a header.
 * Preview renders a real <TableHead>.
 */
export const UI_TableHeader = makeContainerComponent({
  schema,
  render: (props, children) => (
    <Box
      sx={{
        bgcolor: props.bgcolor || "grey.100",
        borderBottom: props.borderBottom === false ? "none" : "1px solid",
        borderColor: "divider",
      }}
    >
      {children}
    </Box>
  ),
});
