import * as React from "react";
import bombieContext from "src/Lib/ComponentGenerator/bombie-context";
import { get } from "src/Lib/Utils/json-handler";
import UIController from "./ui-controller";
import PropertyPanel from "./property-panel";

/**
 * Hook that returns the standard "bag" of builder concerns —
 * formData state + the toolbar (UIController) + the property dialog
 * (PropertyPanel) — as ready-to-mount JSX nodes.
 *
 * Use this when a component MUST render its MUI element as the outermost
 * tag (e.g. Grid item must be a direct child of Grid container, TableRow
 * must be inside TableBody, etc.). The factories in make-component.js wrap
 * everything in a Box, which breaks those cases.
 *
 * Usage:
 *   const { uiControls, propsPanel } = useBuilderControls({ currentChild, schema });
 *   return (
 *     <Grid item xs={...}>
 *       <DropBox>{uiControls}{propsPanel}{children}</DropBox>
 *     </Grid>
 *   );
 */
export function useBuilderControls({ currentChild, schema }) {
  const [data] = React.useContext(bombieContext);
  const [formData, setFormData] = React.useState(
    () => get([...data], currentChild.id)?.props || {}
  );

  return {
    formData,
    setFormData,
    uiControls: <UIController currentChild={currentChild} />,
    propsPanel: (
      <PropertyPanel
        currentChild={currentChild}
        formData={formData}
        setFormData={setFormData}
        schema={schema}
      />
    ),
  };
}

/**
 * Parse a Grid breakpoint value from string state into the form MUI
 * expects: 1-12, the literal strings "auto" / "true" / "false", or
 * `undefined` to inherit.
 */
export function parseBreakpoint(value) {
  if (value === undefined || value === "" || value === null) return undefined;
  if (value === "auto") return "auto";
  if (value === "true" || value === true) return true;
  if (value === "false" || value === false) return false;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}
