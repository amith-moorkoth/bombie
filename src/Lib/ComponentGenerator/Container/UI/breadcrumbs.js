import * as React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { makeLeafComponent } from "./Common/make-component";

const schema = [
  {
    name: "items",
    label: "Items",
    type: "json",
    group: "Content",
    span: "full",
    rows: 5,
    helper: "JSON array of { label, href? }. Last item shown as plain text.",
  },
  {
    name: "maxItems",
    label: "Max items",
    type: "number",
    group: "Behavior",
    min: 1,
    helper: "Collapse overflow above this count",
  },
  {
    name: "separatorIcon",
    label: "Separator",
    type: "select",
    group: "Appearance",
    options: ["/", "›", "•", "→", "chevron"],
  },
];

function normalize(items) {
  if (Array.isArray(items)) return items;
  try {
    return JSON.parse(items);
  } catch {
    return [];
  }
}

export const UI_Breadcrumbs = makeLeafComponent({
  schema,
  render: (props) => {
    const items = normalize(props.items) || [
      { label: "Home", href: "#" },
      { label: "Library", href: "#" },
      { label: "Current" },
    ];
    const sep =
      props.separatorIcon === "chevron" ? (
        <NavigateNextIcon fontSize="small" />
      ) : (
        props.separatorIcon || "/"
      );
    return (
      <Breadcrumbs separator={sep} maxItems={props.maxItems || 8}>
        {items.map((it, i) => {
          const last = i === items.length - 1;
          if (last || !it.href) {
            return (
              <Typography color="text.primary" key={i}>
                {it.label}
              </Typography>
            );
          }
          return (
            <Link key={i} underline="hover" color="inherit" href={it.href}>
              {it.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    );
  },
});
