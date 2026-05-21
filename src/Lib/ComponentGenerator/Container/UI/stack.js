import * as React from "react";
import { Stack } from "@mui/material";
import { makeContainerComponent } from "./Common/make-component";

const schema = [
  {
    name: "direction",
    label: "Direction",
    type: "select",
    group: "Layout",
    options: ["column", "row", "column-reverse", "row-reverse"],
  },
  {
    name: "spacing",
    label: "Spacing",
    type: "number",
    group: "Layout",
    min: 0,
    max: 16,
    step: 0.5,
    helper: "Theme spacing units",
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
    name: "flexWrap",
    label: "Flex wrap",
    type: "select",
    group: "Layout",
    options: ["nowrap", "wrap", "wrap-reverse"],
  },
  {
    name: "useFlexGap",
    label: "Use CSS gap",
    type: "boolean",
    group: "Layout",
    helper: "Use CSS gap instead of negative margins (better with wrap)",
  },
  {
    name: "divider",
    label: "Divider between items",
    type: "boolean",
    group: "Appearance",
    helper: "Inserts a thin divider line between children",
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
    name: "minWidth",
    label: "Min width (px)",
    type: "number",
    group: "Layout",
    min: 0,
    max: 1200,
    step: 20,
  },
  {
    name: "maxWidth",
    label: "Max width (px)",
    type: "number",
    group: "Layout",
    min: 100,
    max: 1600,
    step: 20,
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
      "primary.50",
      "grey.50",
      "grey.100",
    ],
  },
];

// Render a thin Box as the divider when the user opts in. Kept inline so we
// don't pull yet another component into element-render's registry.
function dividerElement(direction) {
  const horizontal = direction === "row" || direction === "row-reverse";
  return (
    <div
      style={{
        flexShrink: 0,
        alignSelf: "stretch",
        backgroundColor: "rgba(0,0,0,0.12)",
        width: horizontal ? 1 : "100%",
        height: horizontal ? "100%" : 1,
      }}
    />
  );
}

export const UI_Stack = makeContainerComponent({
  schema,
  render: (props, children) => {
    const direction = props.direction || "column";
    return (
      <Stack
        direction={direction}
        spacing={props.spacing !== undefined ? Number(props.spacing) : 1}
        alignItems={props.alignItems || undefined}
        justifyContent={props.justifyContent || undefined}
        flexWrap={props.flexWrap || undefined}
        useFlexGap={Boolean(props.useFlexGap)}
        divider={props.divider ? dividerElement(direction) : undefined}
        sx={{
          p: props.padding !== undefined ? Number(props.padding) : undefined,
          minWidth: props.minWidth || undefined,
          maxWidth: props.maxWidth || undefined,
          bgcolor: props.bgcolor || undefined,
        }}
      >
        {children}
      </Stack>
    );
  },
});
