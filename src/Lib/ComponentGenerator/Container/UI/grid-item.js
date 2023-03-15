import * as React from "react";
import { memo, useCallback, useState } from "react";
import { DropBox } from "../../DropBox";
import eleType from "../../Data/element-type";
import bombieContext from "src/Lib/ComponentGenerator/bombie-context";
import { v4 as uuid } from "uuid";
import { Grid } from "@mui/material";
import UIController from "./Common/ui-controller";
import PropertyController from "./Common/property-controller";
import TextField from "@mui/material/TextField";
import { updater, get } from "src/Lib/Utils/json-handler";
import { updateToState, getFromState } from "src/Lib/Utils/js-dom-controller";

export const UI_GridItem = memo(function Container({
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
    <Grid item xs={parseInt(currentChild?.props?.xs || 1)}>
      <DropBox
        accept={currentChild?.info?.accept || []}
        handleonDrop={(item) => handleonDrop(item, currentChild)}
        handleonDrop_Move={(item) => handleonDrop_Move(item, currentChild)}
        handleonHover_Move={(item) => handleonHover_Move(item, currentChild)}
      >
        <UIController currentChild={currentChild} />
        <PropertyController currentChild={currentChild} formData={formData}>
          <TextField
            variant="outlined"
            label="xs"
            size="small"
            value={getFromState(formData, "xs")}
            onChange={(e) => {
              setformData(updateToState(formData, "xs", e.target.value));
            }}
          />
        </PropertyController>
        {children}
      </DropBox>
    </Grid>
  );
});
