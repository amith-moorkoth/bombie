import * as React from "react";
import { Skeleton } from "@mui/material";
import { makeLeafComponent } from "./Common/make-component";

const schema = [
  {
    name: "variant",
    label: "Variant",
    type: "select",
    group: "Appearance",
    options: ["text", "rectangular", "rounded", "circular"],
  },
  {
    name: "animation",
    label: "Animation",
    type: "select",
    group: "Behavior",
    options: ["pulse", "wave", "false"],
  },
  {
    name: "width",
    label: "Width",
    type: "text",
    group: "Size",
    helper: "Number (px) or CSS value (e.g. 100%, 12rem)",
  },
  {
    name: "height",
    label: "Height",
    type: "text",
    group: "Size",
    helper: "Number (px) or CSS value",
  },
];

function asSize(value, fallback) {
  if (value === undefined || value === "") return fallback;
  const num = Number(value);
  return Number.isFinite(num) ? num : value;
}

export const UI_Skeleton = makeLeafComponent({
  schema,
  render: (props) => (
    <Skeleton
      variant={props.variant || "text"}
      animation={
        props.animation === "false" ? false : props.animation || "pulse"
      }
      width={asSize(props.width, props.variant === "circular" ? 40 : 210)}
      height={asSize(
        props.height,
        props.variant === "circular" ? 40 : undefined
      )}
    />
  ),
});
