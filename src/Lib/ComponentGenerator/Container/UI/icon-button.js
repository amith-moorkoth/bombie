import * as React from "react";
import { IconButton } from "@mui/material";
import * as Icons from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import { makeLeafComponent } from "./Common/make-component";

// Common icon names a user is likely to want — keeps the select reasonable
// while still hitting the cases that matter.
const ICON_OPTIONS = [
  "Star",
  "Favorite",
  "FavoriteBorder",
  "Add",
  "Remove",
  "Edit",
  "Delete",
  "Search",
  "Settings",
  "Menu",
  "Close",
  "Check",
  "Download",
  "Upload",
  "Visibility",
  "VisibilityOff",
  "Share",
  "MoreVert",
  "MoreHoriz",
  "ChevronLeft",
  "ChevronRight",
  "ExpandMore",
  "ExpandLess",
  "Refresh",
  "Save",
  "Send",
  "Logout",
  "Login",
  "Home",
  "Notifications",
];

function resolveIcon(name) {
  return Icons[name] || StarIcon;
}

const schema = [
  {
    name: "icon",
    label: "Icon",
    type: "select",
    group: "Content",
    options: ICON_OPTIONS,
  },
  {
    name: "ariaLabel",
    label: "Accessible label",
    type: "text",
    group: "Content",
    helper: "Required for screen readers",
  },
  {
    name: "color",
    label: "Color",
    type: "select",
    group: "Appearance",
    options: [
      "default",
      "primary",
      "secondary",
      "success",
      "error",
      "warning",
      "info",
      "inherit",
    ],
  },
  {
    name: "size",
    label: "Size",
    type: "select",
    group: "Appearance",
    options: ["small", "medium", "large"],
  },
  {
    name: "edge",
    label: "Edge",
    type: "select",
    group: "Appearance",
    options: ["start", "end", "false"],
  },
  { name: "disabled", label: "Disabled", type: "boolean", group: "State" },
];

export const UI_IconButton = makeLeafComponent({
  schema,
  render: (props) => {
    const IconCmp = resolveIcon(props.icon || "Star");
    return (
      <IconButton
        color={props.color || "default"}
        size={props.size || "medium"}
        edge={props.edge === "false" ? false : props.edge}
        disabled={props.disabled}
        aria-label={props.ariaLabel || props.icon || "icon button"}
      >
        <IconCmp />
      </IconButton>
    );
  },
});
