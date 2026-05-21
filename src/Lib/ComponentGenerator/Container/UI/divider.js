import * as React from "react";
import { Divider } from "@mui/material";
import { makeLeafComponent } from "./Common/make-component";

const schema = [
  {
    name: "text",
    label: "Inline text",
    type: "text",
    group: "Content",
    span: "full",
    helper: "Optional label rendered on the divider",
  },
  {
    name: "orientation",
    label: "Orientation",
    type: "select",
    group: "Appearance",
    options: ["horizontal", "vertical"],
  },
  {
    name: "variant",
    label: "Variant",
    type: "select",
    group: "Appearance",
    options: ["fullWidth", "inset", "middle"],
  },
  {
    name: "textAlign",
    label: "Text align",
    type: "select",
    group: "Appearance",
    options: ["left", "center", "right"],
  },
  {
    name: "flexItem",
    label: "Flex item",
    type: "boolean",
    group: "Layout",
    helper: "Use inside a flex container",
  },
  { name: "light", label: "Light", type: "boolean", group: "Appearance" },
];

export const UI_Divider = makeLeafComponent({
  schema,
  render: (props) => (
    <Divider
      orientation={props.orientation || "horizontal"}
      variant={props.variant || "fullWidth"}
      textAlign={props.textAlign || "center"}
      flexItem={props.flexItem}
      light={props.light}
      sx={
        props.orientation === "vertical"
          ? { height: 64, alignSelf: "center" }
          : { my: 1.5 }
      }
    >
      {props.text || undefined}
    </Divider>
  ),
});
