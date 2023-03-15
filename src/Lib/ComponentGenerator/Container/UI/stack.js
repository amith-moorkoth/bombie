import * as React from "react";
import { memo, useCallback, useState } from "react";
import { DropBox } from "../../DropBox";
import eleType from "../../Data/element-type";
import bombieContext from "src/Lib/ComponentGenerator/bombie-context";
import { v4 as uuid } from "uuid";
import { Grid } from "@mui/material";
import UIController from "./Common/ui-controller";
import PropertyController from "./Common/property-controller";
import { TextField, Stack } from "@mui/material";
import { updater, get } from "src/Lib/Utils/json-handler";
import { updateToState, getFromState } from "src/Lib/Utils/js-dom-controller";

export const UI_Stack = memo(function Container({
  currentChild,
  handleonDrop,
  handleonDrop_Move,
  handleonHover_Move,
  children,
}) {
  const [data, setdata, effect, seteffect] = React.useContext(bombieContext);
  const [formData, setformData] = React.useState(
    get([...data], currentChild.id)?.props || {}
  );

  return (
    <DropBox
      accept={currentChild?.info?.accept || []}
      handleonDrop={(item) => handleonDrop(item, currentChild)}
      handleonDrop_Move={(item) => handleonDrop_Move(item, currentChild)}
      handleonHover_Move={(item) => handleonHover_Move(item, currentChild)}
    >
      <Stack
        spacing={parseInt(currentChild?.props?.spacing || 1)}
        direction={currentChild?.props?.direction}
        sx={{ minWidth: "90px" }}
      >
        <UIController currentChild={currentChild} />
        <PropertyController currentChild={currentChild} formData={formData}>
          <TextField
            variant="outlined"
            label="spacing"
            size="small"
            value={getFromState(formData, "spacing")}
            onChange={(e) => {
              setformData(updateToState(formData, "spacing", e.target.value));
            }}
          />
          <TextField
            variant="outlined"
            label="direction"
            size="small"
            value={getFromState(formData, "direction")}
            onChange={(e) => {
              setformData(updateToState(formData, "direction", e.target.value));
            }}
          />
        </PropertyController>
        {children}{" "}
      </Stack>
    </DropBox>
  );
});
