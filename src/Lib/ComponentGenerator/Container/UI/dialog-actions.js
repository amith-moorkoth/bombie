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
  DialogContentText,
  DialogActions,
  Button,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  CardActions,
} from "@mui/material";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CloseIcon from "@mui/icons-material/Close";
import UIController from "./Common/ui-controller";
import PropertyController from "./Common/property-controller";
import { TextField, Paper, TableContainer, Table } from "@mui/material";
import { updater, get } from "src/Lib/Utils/json-handler";
import { updateToState, getFromState } from "src/Lib/Utils/js-dom-controller";

export const UI_DialogActions = memo(function Container({
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
  const handleSave = () => {
    setdata(updater([...data], currentChild.id, "props", { ...formData }));
  };
  return (
    <CardActions>
      <DropBox
        accept={currentChild?.info?.accept || []}
        handleonDrop={(item) => handleonDrop(item, currentChild)}
        handleonDrop_Move={(item) => handleonDrop_Move(item, currentChild)}
        handleonHover_Move={(item) => handleonHover_Move(item, currentChild)}
      >
        <UIController currentChild={currentChild} />
        <PropertyController
          currentChild={currentChild}
          formData={formData}
        ></PropertyController>
        {children}
      </DropBox>
    </CardActions>
  );
});
