import * as React from "react";
import { memo, useCallback, useState } from "react";
import { DropBox } from "../../DropBox";
import eleType from "../../Data/element-type";
import bombieContext from "src/Lib/ComponentGenerator/bombie-context";
import { v4 as uuid } from "uuid";
import {
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import UIController from "./Common/ui-controller";
import PropertyController from "./Common/property-controller";
import { updater, get } from "src/Lib/Utils/json-handler";
import { updateToState, getFromState } from "src/Lib/Utils/js-dom-controller";

export const UI_SelectBox = memo(function Container({
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
        <FormControl fullWidth size={currentChild?.props?.size}>
          <InputLabel>{currentChild?.props?.label}</InputLabel>
          <Select label={currentChild?.props?.label}>
            {/*() => {
              debugger;
              console.log(JSON.parse(currentChild?.props?.json || "[]"));
            }}
            {JSON.parse(JSON.stringify(currentChild?.props?.json) || "[]").map(
              (obj) => {
                return <MenuItem value={obj.value}>{obj.label}</MenuItem>;
              }
            )*/}
            {(currentChild?.props?.options || []).map((obj, index) => {
              return (
                <MenuItem value={obj.value} key={index}>
                  {obj.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <UIController currentChild={currentChild} />
        <PropertyController currentChild={currentChild} formData={formData}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
                  setformData(
                    updateToState(formData, "savePath", e.target.value)
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <AddOption
                getFromState={getFromState}
                formData={formData}
                updateToState={updateToState}
                setformData={setformData}
              />
            </Grid>
          </Grid>
        </PropertyController>
        {children}
      </DropBox>
    </Box>
  );
});

function AddOption({ getFromState, formData, updateToState, setformData }) {
  const [open, setOpen] = React.useState(false);
  const [label, setlabel] = React.useState("");
  const [value, setvalue] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    var _json = getFromState(formData, "options") || [];
    _json.push({ label: label, value: value });
    setlabel("");
    setvalue("");
    setformData(updateToState(formData, "options", _json));
    setOpen(false);
  };
  return (
    <div style={{ border: "1px solid #c4c4c4", padding: "1px" }}>
      <Button variant="contained" size="small" onClick={handleClickOpen}>
        Add Option
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Label</TableCell>
            <TableCell>Value</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(getFromState(formData, "options") || []).map((obj, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{obj?.label}</TableCell>
                <TableCell>{obj?.value}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Option</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              variant="outlined"
              label="label"
              size="small"
              value={label}
              onChange={(e) => {
                setlabel(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              label="value"
              size="small"
              value={value}
              onChange={(e) => {
                setvalue(e.target.value);
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
