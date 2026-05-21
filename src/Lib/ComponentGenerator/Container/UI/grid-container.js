import * as React from "react";
import { Grid } from "@mui/material";
import { makeContainerComponent } from "./Common/make-component";

const schema = [
  {
    name: "spacing",
    label: "Spacing",
    type: "number",
    group: "Layout",
    min: 0,
    max: 16,
    step: 0.5,
    helper: "Both rows and columns",
  },
  {
    name: "rowSpacing",
    label: "Row spacing",
    type: "number",
    group: "Layout",
    min: 0,
    max: 16,
    step: 0.5,
    helper: "Overrides spacing for rows",
  },
  {
    name: "columnSpacing",
    label: "Column spacing",
    type: "number",
    group: "Layout",
    min: 0,
    max: 16,
    step: 0.5,
    helper: "Overrides spacing for columns",
  },
  {
    name: "direction",
    label: "Direction",
    type: "select",
    group: "Layout",
    options: ["row", "row-reverse", "column", "column-reverse"],
  },
  {
    name: "wrap",
    label: "Wrap",
    type: "select",
    group: "Layout",
    options: ["wrap", "nowrap", "wrap-reverse"],
  },
  {
    name: "alignItems",
    label: "Align items",
    type: "select",
    group: "Layout",
    options: ["flex-start", "flex-end", "center", "baseline", "stretch"],
  },
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
    name: "columns",
    label: "Columns",
    type: "number",
    group: "Layout",
    min: 1,
    max: 24,
    helper: "Total columns in this container (default 12)",
  },
];

export const UI_GridContainer = makeContainerComponent({
  schema,
  render: (props, children) => (
    <Grid
      container
      spacing={props.spacing !== undefined ? Number(props.spacing) : 0}
      rowSpacing={
        props.rowSpacing !== undefined ? Number(props.rowSpacing) : undefined
      }
      columnSpacing={
        props.columnSpacing !== undefined
          ? Number(props.columnSpacing)
          : undefined
      }
      direction={props.direction || undefined}
      wrap={props.wrap || undefined}
      alignItems={props.alignItems || undefined}
      justifyContent={props.justifyContent || undefined}
      columns={props.columns !== undefined ? Number(props.columns) : undefined}
    >
      {children}
    </Grid>
  ),
});
