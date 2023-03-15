import * as React from "react";
import { memo, useCallback, useState } from "react";
import bombieContext from "src/Lib/ComponentGenerator/bombie-context";
import { v4 as uuid } from "uuid";
import { Grid, Badge, Stack, Typography, Tooltip } from "@mui/material";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CloseIcon from "@mui/icons-material/Close";
import { remove } from "src/Lib/Utils/json-handler";
import MoveGrabBox from "src/Lib/ComponentGenerator/DragBox/move";

export default function UIController({ currentChild }) {
  const [data, setdata, effect, seteffect] = React.useContext(bombieContext);

  const openDialog = () => {
    seteffect({ ...effect, open_UIController_Dialog: currentChild.id });
  };
  const removefromUI = () => {
    setdata(remove([...data], currentChild.id));
  };
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        boxShadow: 1,
        height: "23px",
        borderRadius: "10px",
        paddingLeft: "5px",
        paddingRight: "5px",
        //minWidth: "150px",
        position: "absolute",
        background: "white",
        right: "1%",
        top: "-10px",
        opacity: "0.6",
        "&:hover": { opacity: "1" },
      }}
    >
      {/**<Typography variant="subtitle2" sx={{ marginRight: "20px" }}>
        {currentChild.info.name}
      </Typography> */}
      <MoveGrabBox id={currentChild.id} type={currentChild.info.type} />
      <Tooltip title={currentChild.info.name + " Edit"} arrow placement="top">
        <AppRegistrationIcon
          fontSize={"small"}
          sx={{ marginRight: "5px !important", cursor: "pointer" }}
          onClick={() => {
            openDialog();
          }}
        />
      </Tooltip>
      <Tooltip title={currentChild.info.name + " Close"} arrow placement="top">
        <CloseIcon
          fontSize={"small"}
          onClick={() => {
            removefromUI();
          }}
          sx={{ marginRight: "5px !important", cursor: "pointer" }}
        />
      </Tooltip>
    </Stack>
  );
}
