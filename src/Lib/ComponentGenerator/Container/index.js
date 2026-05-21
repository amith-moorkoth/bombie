import * as React from "react";
import { memo, useCallback } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { DropBox } from "../DropBox";
import eleType from "../Data/element-type";
import bombieContext from "src/Lib/ComponentGenerator/bombie-context";
import ElementRecursion from "./element-recursion";
import { v4 as uuid } from "uuid";
import {
  updater,
  removeANDupdate,
  get,
  remove,
} from "src/Lib/Utils/json-handler";

function EmptyCanvasHint() {
  const theme = useTheme();
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={1.5}
      sx={{
        py: { xs: 6, md: 10 },
        textAlign: "center",
        color: "text.secondary",
        pointerEvents: "none",
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: 2,
          border: `2px dashed ${alpha(theme.palette.primary.main, 0.4)}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "primary.main",
        }}
      >
        <AddOutlinedIcon fontSize="large" />
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
        Start building your component
      </Typography>
      <Typography variant="body2">
        Drag components from the right panel and drop them here
      </Typography>
    </Stack>
  );
}

export const Container = memo(function Container() {
  const [data, setdata, effect, seteffect] = React.useContext(bombieContext);

  const handleDrop = useCallback(
    (item) => {
      setdata([...data, { id: uuid(), ...item, child: [] }]);
    },
    [data]
  );

  const handleDropInner = useCallback(
    (item, currentChild) => {
      const newdata = {
        id: uuid(),
        ...item,
        child: [],
      };
      setdata(
        updater([...data], currentChild.id, "child", [
          ...currentChild.child,
          newdata,
        ])
      );
    },
    [data]
  );

  const handleonDrop_Move = useCallback(
    (item) => {
      const newdata = get([...data], item.id);
      const mainArray = remove([...data], item.id);
      setdata([...mainArray, newdata]);
    },
    [data]
  );

  const handleonDrop_MoveInner = useCallback(
    (item, currentChild) => {
      setdata(removeANDupdate([...data], item.id, currentChild));
    },
    [data]
  );

  const handleonHover_Move = useCallback(
    (item) => {
      /**need to work on */
    },
    [data]
  );

  const handleonHover_MoveInner = useCallback(
    (item, currentChild) => {
      /**need to work on */
      //setdata(sortForSingleParent([...data], item.id, currentChild));
    },
    [data]
  );

  const isEmpty = !data || data.length === 0;

  return (
    <Box sx={{ overflow: "hidden", clear: "both" }}>
      <DropBox
        accept={[eleType.LAYOUT, eleType.CARD]}
        handleonDrop={(item) => handleDrop(item)}
        handleonDrop_Move={(item) => handleonDrop_Move(item)}
        handleonHover_Move={(item) => handleonHover_Move(item)}
      >
        {isEmpty ? (
          <EmptyCanvasHint />
        ) : (
          <ElementRecursion
            data={data}
            handleonDrop={handleDropInner}
            handleonDrop_Move={handleonDrop_MoveInner}
            handleonHover_Move={handleonDrop_MoveInner}
          />
        )}
      </DropBox>
    </Box>
  );
});
