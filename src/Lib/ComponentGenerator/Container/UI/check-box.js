import * as React from "react";
import { memo, useCallback, useState } from "react";
import { DropBox } from "../../DropBox";
import eleType from "../../Data/element-type";
import bombieContext from "src/Lib/ComponentGenerator/bombie-context";
import { v4 as uuid } from "uuid";
import { TextField, Box, Checkbox, FormControlLabel } from "@mui/material";
import UIController from "./Common/ui-controller";
import PropertyController from "./Common/property-controller";
import { updater, get } from "src/Lib/Utils/json-handler";
import { updateToState, getFromState } from "src/Lib/Utils/js-dom-controller";

export const UI_CheckBox = memo(function Container({
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

  /*React.useEffect(() => {
    fetch("/api/weatherforecast").then((res) => {
      alert(JSON.stringify(res));
    });
    //https://localhost:44379/weatherforecast
  }, []);*/

  return (
    <Box component="span">
      <DropBox
        accept={currentChild?.info?.accept || []}
        handleonDrop={(item) => handleonDrop(item, currentChild)}
        handleonDrop_Move={(item) => handleonDrop_Move(item, currentChild)}
        handleonHover_Move={(item) => handleonHover_Move(item, currentChild)}
      >
        <FormControlLabel
          control={<Checkbox size={currentChild?.props?.size} />}
          label={currentChild?.props?.label}
        />
        <UIController currentChild={currentChild} />
        <PropertyController currentChild={currentChild} formData={formData}>
          <TextField
            variant="outlined"
            label="label"
            size="small"
            value={getFromState(formData, "label")}
            onChange={(e) => {
              setformData(updateToState(formData, "label", e.target.value));
            }}
          />{" "}
          <TextField
            variant="outlined"
            label="size"
            size="small"
            value={getFromState(formData, "size")}
            onChange={(e) => {
              setformData(updateToState(formData, "size", e.target.value));
            }}
          />
          <TextField
            variant="outlined"
            label="save path"
            size="small"
            value={getFromState(formData, "savePath")}
            onChange={(e) => {
              setformData(updateToState(formData, "savePath", e.target.value));
            }}
          />
        </PropertyController>
        {children}
      </DropBox>
    </Box>
  );
});
