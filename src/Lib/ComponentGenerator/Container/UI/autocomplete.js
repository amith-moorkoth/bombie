import * as React from "react";
import { memo, useCallback, useState } from "react";
import { DropBox } from "../../DropBox";
import eleType from "../../Data/element-type";
import bombieContext from "src/Lib/ComponentGenerator/bombie-context";
import { v4 as uuid } from "uuid";
import { TextField, Box, Autocomplete } from "@mui/material";
import UIController from "./Common/ui-controller";
import PropertyController from "./Common/property-controller";
import { updater, get } from "src/Lib/Utils/json-handler";
import { updateToState, getFromState } from "src/Lib/Utils/js-dom-controller";

export const UI_Autocomplete = memo(function Container({
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

  /*function stringToJSON(str) {
    debugger;
    let obj = {};
    obj.val = str;
    return obj.val;
  }*/

  const [jsonData, setjsonData] = React.useState(
    getFromState(formData, "options")
  );
  const [jsonDataError, setjsonDataError] = React.useState("");
  React.useEffect(() => {
    try {
      JSON5.parse(jsonData);
      setjsonDataError("");
    } catch (err) {
      setjsonDataError(err.message.replace("JSON5:", "Error:"));
    }
  }, [jsonData]);

  return (
    <Box component="span">
      <DropBox
        accept={currentChild?.info?.accept || []}
        handleonDrop={(item) => handleonDrop(item, currentChild)}
        handleonDrop_Move={(item) => handleonDrop_Move(item, currentChild)}
        handleonHover_Move={(item) => handleonHover_Move(item, currentChild)}
      >
        <Autocomplete
          disablePortal
          options={currentChild?.props?.options || []}
          getOptionLabel={(option) =>
            getFromState(option, currentChild?.props?.getOptionLabel)
          }
          /**renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt=""
              />
              {option.label} ({option.code}) +{option.phone}
            </Box>
          )} */
          renderInput={(params) => (
            <TextField
              {...params}
              size={currentChild?.props?.size}
              fullWidth={currentChild?.props?.fullWidth}
              label={currentChild?.props?.label}
            />
          )}
        />
        <UIController currentChild={currentChild} />
        <PropertyController currentChild={currentChild} formData={formData}>
          <TextField
            variant="outlined"
            fullWidth="true"
            label="options from URL"
            size="small"
            value={getFromState(formData, "optionsURL")}
            onChange={(e) => {
              setformData(
                updateToState(formData, "optionsURL", e.target.value)
              );
            }}
          />
          <TextField
            variant="outlined"
            fullWidth="true"
            label="options"
            size="small"
            multiline
            rows={2}
            value={jsonData}
            onChange={(e) => {
              setjsonData(e.target.value);
              setformData(
                updateToState(formData, "options", JSON5.parse(e.target.value))
              );
            }}
          />
          <span style={{ width: "100%", color: "red" }}>{jsonDataError}</span>
          <br />
          <TextField
            variant="outlined"
            label="getOptionLabel"
            size="small"
            value={getFromState(formData, "getOptionLabel")}
            onChange={(e) => {
              setformData(
                updateToState(formData, "getOptionLabel", e.target.value)
              );
            }}
          />
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
            label="fullWidth"
            size="small"
            value={getFromState(formData, "fullWidth")}
            onChange={(e) => {
              setformData(updateToState(formData, "fullWidth", e.target.value));
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
            label="save path"
            size="small"
            value={getFromState(formData, "savePath")}
            onChange={(e) => {
              setformData(updateToState(formData, "savePath", e.target.value));
            }}
          />
          <TextField
            variant="outlined"
            label="open Dialog By Name"
            size="small"
            value={getFromState(formData, "openDialogName")}
            onChange={(e) => {
              setformData(
                updateToState(formData, "openDialogName", e.target.value)
              );
            }}
          />
          <TextField
            variant="outlined"
            label="empty parent text"
            size="small"
            value={getFromState(formData, "emptyParentText")}
            onChange={(e) => {
              setformData(
                updateToState(formData, "emptyParentText", e.target.value)
              );
            }}
          />
        </PropertyController>
        {children}
      </DropBox>
    </Box>
  );
});
