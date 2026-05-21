import * as React from "react";
import { memo } from "react";
import { Grid } from "@mui/material";
import { DropBox } from "../../DropBox";
import { useBuilderControls, parseBreakpoint } from "./Common/builder-controls";

const breakpointOptions = [
  { label: "Inherit", value: "" },
  { label: "Auto", value: "auto" },
  { label: "True (fill)", value: "true" },
  { label: "False (none)", value: "false" },
  ...Array.from({ length: 12 }, (_, i) => ({
    label: String(i + 1),
    value: String(i + 1),
  })),
];

const schema = [
  {
    name: "xs",
    label: "xs",
    type: "select",
    group: "Breakpoints",
    options: breakpointOptions,
    helper: "Width 0px+",
  },
  {
    name: "sm",
    label: "sm",
    type: "select",
    group: "Breakpoints",
    options: breakpointOptions,
    helper: "Width 600px+",
  },
  {
    name: "md",
    label: "md",
    type: "select",
    group: "Breakpoints",
    options: breakpointOptions,
    helper: "Width 900px+",
  },
  {
    name: "lg",
    label: "lg",
    type: "select",
    group: "Breakpoints",
    options: breakpointOptions,
    helper: "Width 1200px+",
  },
  {
    name: "xl",
    label: "xl",
    type: "select",
    group: "Breakpoints",
    options: breakpointOptions,
    helper: "Width 1536px+",
  },
  {
    name: "zeroMinWidth",
    label: "Zero min width",
    type: "boolean",
    group: "Layout",
    helper: "Lets the item shrink below its content size",
  },
];

/**
 * Grid item must be a direct child of Grid container, so the MUI element
 * is the outer wrapper here and DropBox/controls go inside.
 */
export const UI_GridItem = memo(function UI_GridItem({
  currentChild,
  handleonDrop,
  handleonDrop_Move,
  handleonHover_Move,
  children,
}) {
  const { uiControls, propsPanel } = useBuilderControls({
    currentChild,
    schema,
  });
  const p = currentChild?.props || {};

  return (
    <Grid
      item
      xs={parseBreakpoint(p.xs) ?? 12}
      sm={parseBreakpoint(p.sm)}
      md={parseBreakpoint(p.md)}
      lg={parseBreakpoint(p.lg)}
      xl={parseBreakpoint(p.xl)}
      zeroMinWidth={Boolean(p.zeroMinWidth)}
    >
      <DropBox
        accept={currentChild?.info?.accept || []}
        handleonDrop={(item) => handleonDrop(item, currentChild)}
        handleonDrop_Move={(item) => handleonDrop_Move(item, currentChild)}
        handleonHover_Move={(item) => handleonHover_Move(item, currentChild)}
      >
        {uiControls}
        {propsPanel}
        {children}
      </DropBox>
    </Grid>
  );
});
