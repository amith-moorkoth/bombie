import * as React from "react";
import { memo, useCallback, useState } from "react";
import { DropBox } from "../../DropBox";
import eleType from "../../Data/element-type";
import bombieContext from "src/Lib/ComponentGenerator/bombie-context";
import { v4 as uuid } from "uuid";
import { TextField, Box, Typography } from "@mui/material";
import UIController from "./Common/ui-controller";
import PropertyController from "./Common/property-controller";
import { updater, get } from "src/Lib/Utils/json-handler";
import { updateToState, getFromState } from "src/Lib/Utils/js-dom-controller";

export const UI_Label = memo(function Container({
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
    <DropBox
      accept={currentChild?.info?.accept || []}
      handleonDrop={(item) => handleonDrop(item, currentChild)}
      handleonDrop_Move={(item) => handleonDrop_Move(item, currentChild)}
      handleonHover_Move={(item) => handleonHover_Move(item, currentChild)}
    >
      <Typography
        variant={currentChild?.props?.variant}
        sx={{ textAlign: currentChild?.props?.textAlign }}
      >
        <b>{currentChild?.props?.label}</b>
      </Typography>
      <UIController currentChild={currentChild} />
      <PropertyController currentChild={currentChild} formData={formData}>
        <TextField
          variant="outlined"
          label="variant"
          size="small"
          value={getFromState(formData, "variant")}
          onChange={(e) => {
            setformData(updateToState(formData, "variant", e.target.value));
          }}
        />
        <TextField
          variant="outlined"
          label="label"
          size="small"
          value={getFromState(formData, "label")}
          onChange={(e) => {
            setformData(updateToState(formData, "label", e.target.value));
          }}
        />
        <TextField
          variant="outlined"
          label="textAlign"
          size="small"
          value={getFromState(formData, "textAlign")}
          onChange={(e) => {
            setformData(updateToState(formData, "textAlign", e.target.value));
          }}
        />
      </PropertyController>
      {children}
    </DropBox>
  );
});
