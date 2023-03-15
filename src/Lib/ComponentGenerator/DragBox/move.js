import * as React from "react";
import { memo } from "react";
import { useDrag } from "react-dnd";
import Button from "@mui/material/Button";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ElementType from "src/Lib/ComponentGenerator/Data/element-type";
const style = {};
const MoveBox = memo(function Box({ id, type }) {
  //var type = ElementType.MOVE;
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { action: "MOVE", id: id },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [id, type]
  );
  return (
    <div ref={drag} style={{ ...style, opacity }}>
      <ZoomOutMapIcon
        fontSize={"small"}
        sx={{ marginRight: "5px !important", cursor: "move" }}
      />
    </div>
  );
});

export default MoveBox;
