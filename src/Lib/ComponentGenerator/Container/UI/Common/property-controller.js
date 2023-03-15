import * as React from "react";
import { memo, useCallback, useState } from "react";
import bombieContext from "src/Lib/ComponentGenerator/bombie-context";
import { v4 as uuid } from "uuid";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CloseIcon from "@mui/icons-material/Close";
import { remove } from "src/Lib/Utils/json-handler";
import MoveGrabBox from "src/Lib/ComponentGenerator/DragBox/move";
import {
  Grid,
  Badge,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
} from "@mui/material";
import { updater, get } from "src/Lib/Utils/json-handler";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PropertyController({
  currentChild,
  children,
  formData,
}) {
  const [data, setdata, effect, seteffect] = React.useContext(bombieContext);

  const closeDialog = () => {
    seteffect({ ...effect, open_UIController_Dialog: "" });
  };
  const openDialog = () => {
    seteffect({ ...effect, open_UIController_Dialog: currentChild.id });
  };

  return (
    <Dialog
      open={effect?.open_UIController_Dialog === currentChild.id}
      onClose={closeDialog}
      fullWidth
      keepMounted
      TransitionComponent={Transition}
      maxWidth="xl"
    >
      <DialogTitle>{currentChild?.info?.name}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button
          onClick={() => {
            closeDialog();
            setdata(
              updater([...data], currentChild.id, "props", { ...formData })
            );
            //handleSave();
          }}
          variant="contained"
        >
          Save & Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
