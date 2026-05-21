import * as React from "react";
import { memo } from "react";
import { Box } from "@mui/material";
import { DropBox } from "../../../DropBox";
import bombieContext from "src/Lib/ComponentGenerator/bombie-context";
import { get } from "src/Lib/Utils/json-handler";
import UIController from "./ui-controller";
import PropertyPanel from "./property-panel";

/**
 * Factory for visual-builder UI components. Two flavors share most logic:
 *
 *   makeLeafComponent({ render, schema })
 *     Components that render a single MUI element with editable props but
 *     don't host children (Button, Typography, Switch, etc.). render(props)
 *     returns the JSX, schema is an array of field descriptors for the
 *     property editor.
 *
 *   makeContainerComponent({ render, schema })
 *     Components that accept dropped children (Card, Stack, Tabs, etc.).
 *     render(props, children) is given children-as-jsx to compose.
 *
 * Both return a memo'd React component that the builder mounts via
 * element-render.js. The shape matches the original hand-written UI files so
 * the rest of the codebase (drop handlers, UIController, etc.) is unchanged.
 */
function makeComponent({ render, schema = [], leaf }) {
  return memo(function GeneratedComponentUI({
    currentChild,
    handleonDrop,
    handleonDrop_Move,
    handleonHover_Move,
    children,
  }) {
    const [data] = React.useContext(bombieContext);
    const [formData, setFormData] = React.useState(
      () => get([...data], currentChild.id)?.props || {}
    );

    const props = currentChild?.props || {};

    return (
      <Box component={leaf ? "span" : "div"} sx={{ display: "block" }}>
        <DropBox
          accept={currentChild?.info?.accept || []}
          handleonDrop={(item) => handleonDrop(item, currentChild)}
          handleonDrop_Move={(item) => handleonDrop_Move(item, currentChild)}
          handleonHover_Move={(item) => handleonHover_Move(item, currentChild)}
        >
          {leaf ? render(props) : render(props, children)}
          <UIController currentChild={currentChild} />
          <PropertyPanel
            currentChild={currentChild}
            formData={formData}
            setFormData={setFormData}
            schema={schema}
          />
          {leaf && children}
        </DropBox>
      </Box>
    );
  });
}

export function makeLeafComponent(config) {
  return makeComponent({ ...config, leaf: true });
}

export function makeContainerComponent(config) {
  return makeComponent({ ...config, leaf: false });
}
