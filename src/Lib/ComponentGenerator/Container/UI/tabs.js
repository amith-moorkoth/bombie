import * as React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { makeLeafComponent } from "./Common/make-component";

const schema = [
  {
    name: "tabs",
    label: "Tabs",
    type: "json",
    group: "Content",
    span: "full",
    rows: 6,
    helper: "JSON array of { label, value, disabled?, icon? }",
  },
  {
    name: "defaultIndex",
    label: "Default selected index",
    type: "number",
    group: "State",
    min: 0,
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
    options: ["standard", "fullWidth", "scrollable"],
  },
  {
    name: "indicatorColor",
    label: "Indicator color",
    type: "select",
    group: "Appearance",
    options: ["primary", "secondary"],
  },
  {
    name: "textColor",
    label: "Text color",
    type: "select",
    group: "Appearance",
    options: ["primary", "secondary", "inherit"],
  },
  { name: "centered", label: "Centered", type: "boolean", group: "Appearance" },
];

function normalizeTabs(t) {
  if (Array.isArray(t)) return t;
  try {
    return JSON.parse(t);
  } catch {
    return [];
  }
}

// Hooks live in a real component so eslint-plugin-react-hooks can verify
// them — the `render` arg to makeLeafComponent is just a plain function.
function TabsRuntime({ props }) {
  const tabs = normalizeTabs(props.tabs) || [];
  const [value, setValue] = React.useState(props.defaultIndex ?? 0);
  React.useEffect(() => {
    // Keep selected index valid if tab list shrinks.
    if (value >= tabs.length) setValue(0);
  }, [tabs.length, value]);
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", minWidth: 240 }}>
      <Tabs
        value={Math.min(value, Math.max(tabs.length - 1, 0))}
        onChange={(_, v) => setValue(v)}
        orientation={props.orientation || "horizontal"}
        variant={props.variant || "standard"}
        indicatorColor={props.indicatorColor || "primary"}
        textColor={props.textColor || "primary"}
        centered={props.centered}
      >
        {(tabs.length ? tabs : [{ label: "Tab 1" }, { label: "Tab 2" }]).map(
          (t, i) => (
            <Tab key={i} label={t.label} disabled={t.disabled} />
          )
        )}
      </Tabs>
    </Box>
  );
}

export const UI_Tabs = makeLeafComponent({
  schema,
  render: (props) => <TabsRuntime props={props} />,
});
