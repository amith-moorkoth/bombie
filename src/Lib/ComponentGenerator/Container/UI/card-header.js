import * as React from "react";
import { memo, useCallback, useState } from "react";
import { DropBox } from "../../DropBox";
import eleType from "../../Data/element-type";
import bombieContext from "src/Lib/ComponentGenerator/bombie-context";
import { v4 as uuid } from "uuid";
import {
  Grid,
  Card,
  Badge,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  CardHeader,
  Divider,
} from "@mui/material";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CloseIcon from "@mui/icons-material/Close";
import UIController from "./Common/ui-controller";
import PropertyController from "./Common/property-controller";
import TextField from "@mui/material/TextField";
import { updater, get } from "src/Lib/Utils/json-handler";
import { updateToState, getFromState } from "src/Lib/Utils/js-dom-controller";

export const UI_CardHeader = memo(function Container({
  currentChild,
  handleonDrop,
  handleonDrop_Move,
  handleonHover_Move,
  children,
}) {
  const [data, setdata, effect, seteffect] = React.useContext(bombieContext);

  const cardHeaderColor = {
    C: "#9b7490",
    M: "#4b800c",
    F: "#5e7aa9",
    G: "#bfbfbf",
  };

  const [formData, setformData] = React.useState(
    get([...data], currentChild.id)?.props || {}
  );
  const handleSave = () => {
    setdata(updater([...data], currentChild.id, "props", { ...formData }));
  };
  return (
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
          label="title"
          size="small"
          value={getFromState(formData, "title")}
          onChange={(e) => {
            setformData(updateToState(formData, "title", e.target.value));
          }}
        />
        <TextField
          variant="outlined"
          label="subheader"
          size="small"
          value={getFromState(formData, "subheader")}
          onChange={(e) => {
            setformData(updateToState(formData, "subheader", e.target.value));
          }}
        />
        <TextField
          variant="outlined"
          label="padding"
          size="small"
          value={getFromState(formData, "padding")}
          onChange={(e) => {
            setformData(updateToState(formData, "padding", e.target.value));
          }}
        />
        <TextField
          variant="outlined"
          label="divider"
          size="small"
          value={getFromState(formData, "divider")}
          onChange={(e) => {
            setformData(updateToState(formData, "divider", e.target.value));
          }}
        />
        <TextField
          variant="outlined"
          label="cardHeaderColor"
          size="small"
          value={getFromState(formData, "cardHeaderColor")}
          onChange={(e) => {
            setformData(
              updateToState(formData, "cardHeaderColor", e.target.value)
            );
          }}
        />
      </PropertyController>
      {currentChild?.props?.divider === "true" && (
        <Divider
          sx={{
            height: "7px",
            backgroundColor:
              cardHeaderColor[currentChild?.props?.cardHeaderColor] ||
              cardHeaderColor["C"],
          }}
        />
      )}
      <CardHeader
        sx={{
          padding: currentChild?.props?.padding || "0px !important",
        }}
        title={currentChild?.props?.title}
        subheader={currentChild?.props?.subheader}
        action={<>{children}</>}
      />
    </DropBox>
  );
});
