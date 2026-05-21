import * as React from "react";
import { Box } from "@mui/material";
import { makeContainerComponent } from "./Common/make-component";

const schema = [
  {
    name: "striped",
    label: "Striped rows",
    type: "boolean",
    group: "Appearance",
    helper: "Alternating row backgrounds (zebra)",
  },
  {
    name: "bgcolor",
    label: "Background",
    type: "select",
    group: "Appearance",
    options: ["transparent", "background.paper", "background.default"],
  },
];

/**
 * Builder-mode TableBody. Preview renders a real <TableBody>.
 */
export const UI_TableBody = makeContainerComponent({
  schema,
  render: (props, children) => (
    <Box
      sx={{
        bgcolor: props.bgcolor || "transparent",
        ...(props.striped
          ? { "& > *:nth-of-type(odd)": { bgcolor: "grey.50" } }
          : {}),
      }}
    >
      {children}
    </Box>
  ),
});
