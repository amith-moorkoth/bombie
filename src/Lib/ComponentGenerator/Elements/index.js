import * as React from "react";
import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { DragBox } from "../DragBox";
import elements from "../Data/elements.js";
import { iconForTag, colorForCategory } from "./icon-map.js";

// Group palette items by display category. The categories are presentation-
// only; the drag/drop type system is still driven by data/element-type.js.
const CATEGORIES = [
  {
    id: "layout",
    title: "Layout",
    tags: [
      "CARD",
      "CARDHEADER",
      "CARDCONTENT",
      "CARDACTIONS",
      "GRIDCONTAINER",
      "GRIDITEM",
      "STACK",
      "DIALOG",
      "DIALOGCONTENT",
      "DIALOGACTIONS",
      "ACCORDION",
    ],
  },
  {
    id: "form",
    title: "Form Elements",
    tags: [
      "TEXTFIELD",
      "LABEL",
      "CHECKBOX",
      "SELECT",
      "AUTOCOMPLETE",
      "BUTTON",
      "ICONBUTTON",
      "SWITCH",
      "RADIOGROUP",
      "SLIDER",
    ],
  },
  {
    id: "data",
    title: "Data Display",
    tags: [
      "TYPOGRAPHY",
      "AVATAR",
      "CHIP",
      "DIVIDER",
      "TOOLTIP",
      "TABLE",
      "TABLEHEADER",
      "TABLEBODY",
      "TABLEROW",
      "TABLECELL",
    ],
  },
  {
    id: "feedback",
    title: "Feedback",
    tags: ["ALERT", "LINEAR_PROGRESS", "CIRCULAR_PROGRESS", "SKELETON"],
  },
  {
    id: "navigation",
    title: "Navigation",
    tags: ["TABS", "STEPPER", "BREADCRUMBS", "PAGINATION"],
  },
];

function categorize(items) {
  // Index items by tag for fast lookup; preserve config-defined order within a
  // category, but drop tags that don't exist in the data so the palette can't
  // show ghost cards if the catalog shrinks.
  const byTag = new Map(items.map((it) => [it.tag, it]));
  return CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.tags.map((t) => byTag.get(t)).filter(Boolean),
  })).filter((cat) => cat.items.length > 0);
}

export default function Elements() {
  const [query, setQuery] = React.useState("");
  const grouped = React.useMemo(() => categorize(elements), []);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? grouped
        .map((cat) => ({
          ...cat,
          items: cat.items.filter((it) => it.name.toLowerCase().includes(q)),
        }))
        .filter((cat) => cat.items.length > 0)
    : grouped;

  return (
    <Stack spacing={2}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Components
      </Typography>

      <TextField
        size="small"
        placeholder="Search components…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
          No components match “{query}”.
        </Typography>
      )}

      {filtered.map((cat) => (
        <Box key={cat.id}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{
              fontWeight: 700,
              letterSpacing: "0.12em",
              display: "block",
              mb: 1,
            }}
          >
            {cat.title}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 1.25,
            }}
          >
            {cat.items.map((item) => (
              <DragBox
                key={item.tag}
                data={item}
                type={item.type}
                icon={iconForTag(item.tag)}
                accent={colorForCategory(cat.id)}
              />
            ))}
          </Box>
        </Box>
      ))}
    </Stack>
  );
}
