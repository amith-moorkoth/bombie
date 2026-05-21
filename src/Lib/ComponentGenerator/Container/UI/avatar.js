import * as React from "react";
import { Avatar } from "@mui/material";
import { makeLeafComponent } from "./Common/make-component";

const schema = [
  {
    name: "src",
    label: "Image URL",
    type: "text",
    group: "Content",
    span: "full",
  },
  {
    name: "alt",
    label: "Alt text",
    type: "text",
    group: "Content",
    helper: "Accessible label / fallback initials",
  },
  {
    name: "children",
    label: "Fallback text",
    type: "text",
    group: "Content",
    helper: "Initials if no image",
  },
  {
    name: "variant",
    label: "Variant",
    type: "select",
    group: "Appearance",
    options: ["circular", "rounded", "square"],
  },
  {
    name: "size",
    label: "Size (px)",
    type: "number",
    group: "Appearance",
    min: 16,
    max: 200,
    step: 4,
  },
  {
    name: "bgcolor",
    label: "Background",
    type: "select",
    group: "Appearance",
    options: [
      "primary.main",
      "secondary.main",
      "success.main",
      "error.main",
      "warning.main",
      "info.main",
      "grey.500",
    ],
  },
];

export const UI_Avatar = makeLeafComponent({
  schema,
  render: (props) => {
    const size = props.size || 40;
    return (
      <Avatar
        src={props.src}
        alt={props.alt}
        variant={props.variant || "circular"}
        sx={{
          width: size,
          height: size,
          bgcolor: props.bgcolor,
        }}
      >
        {props.children || (props.alt || "?")[0]?.toUpperCase()}
      </Avatar>
    );
  },
});
