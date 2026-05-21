import * as React from "react";
import { Box } from "@mui/material";
import { makeContainerComponent } from "./Common/make-component";

const schema = [
  {
    name: "hover",
    label: "Hover highlight",
    type: "boolean",
    group: "Behavior",
  },
  { name: "selected", label: "Selected", type: "boolean", group: "State" },
  {
    name: "spacing",
    label: "Cell gap (px)",
    type: "number",
    group: "Layout",
    min: 0,
    max: 64,
    step: 4,
  },
  {
    name: "minHeight",
    label: "Min height (px)",
    type: "number",
    group: "Layout",
    min: 24,
    max: 200,
    step: 4,
  },
  {
    name: "bgcolor",
    label: "Background",
    type: "select",
    group: "Appearance",
    options: ["transparent", "grey.50", "primary.50", "warning.50", "error.50"],
  },
];

/**
 * Builder-mode TableRow: renders cells horizontally via flex. Preview uses
 * proper <TableRow><TableCell>...</TableCell></TableRow>.
 */
export const UI_TableRow = makeContainerComponent({
  schema,
  render: (props, children) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        gap: props.spacing !== undefined ? `${Number(props.spacing)}px` : 0,
        minHeight: props.minHeight || 40,
        bgcolor: props.selected ? "primary.50" : props.bgcolor || undefined,
        borderBottom: "1px solid",
        borderColor: "divider",
        ...(props.hover ? { "&:hover": { bgcolor: "action.hover" } } : {}),
      }}
    >
      {children}
    </Box>
  ),
});
