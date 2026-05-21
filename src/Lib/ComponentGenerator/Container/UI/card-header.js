import * as React from "react";
import { Avatar, CardHeader, Divider } from "@mui/material";
import { makeContainerComponent } from "./Common/make-component";

const schema = [
  {
    name: "title",
    label: "Title",
    type: "text",
    group: "Content",
    span: "full",
  },
  {
    name: "subheader",
    label: "Subheader",
    type: "text",
    group: "Content",
    span: "full",
  },

  {
    name: "avatarText",
    label: "Avatar text",
    type: "text",
    group: "Avatar",
    helper: "Letters / emoji to show on the left",
  },
  {
    name: "avatarBg",
    label: "Avatar background",
    type: "select",
    group: "Avatar",
    options: [
      "primary.main",
      "secondary.main",
      "success.main",
      "warning.main",
      "error.main",
      "info.main",
      "grey.500",
      "grey.300",
    ],
  },
  {
    name: "avatarVariant",
    label: "Avatar variant",
    type: "select",
    group: "Avatar",
    options: ["circular", "rounded", "square"],
  },

  {
    name: "padding",
    label: "Padding",
    type: "number",
    group: "Layout",
    min: 0,
    max: 8,
    step: 1,
    helper: "Theme spacing units",
  },
  {
    name: "showDivider",
    label: "Show top divider",
    type: "boolean",
    group: "Layout",
  },
  {
    name: "dividerColor",
    label: "Divider color",
    type: "select",
    group: "Layout",
    options: [
      "primary.main",
      "secondary.main",
      "divider",
      "grey.300",
      "grey.500",
    ],
  },
  {
    name: "align",
    label: "Title alignment",
    type: "select",
    group: "Appearance",
    options: ["left", "center", "right"],
  },
];

export const UI_CardHeader = makeContainerComponent({
  schema,
  // `children` in the builder represent the CardHeader `action` slot (whatever
  // the user dropped into the header). It renders on the right side.
  render: (props, children) => (
    <>
      {props.showDivider && (
        <Divider
          sx={{
            height: 4,
            border: "none",
            bgcolor: props.dividerColor || "primary.main",
          }}
        />
      )}
      <CardHeader
        sx={{
          p: props.padding !== undefined ? Number(props.padding) : undefined,
          "& .MuiCardHeader-content": {
            textAlign: props.align || undefined,
          },
        }}
        title={props.title}
        subheader={props.subheader}
        avatar={
          props.avatarText ? (
            <Avatar
              variant={props.avatarVariant || "circular"}
              sx={{ bgcolor: props.avatarBg || "primary.main" }}
            >
              {props.avatarText}
            </Avatar>
          ) : undefined
        }
        action={children || undefined}
      />
    </>
  ),
});
