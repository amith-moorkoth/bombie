import * as React from "react";
import { memo } from "react";
import { useDrag } from "react-dnd";
import Button from "@mui/material/Button";
const style = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  cursor: "move",
  marginBottom: "8px",
  marginTop: "8px",
};
export const DragBox = memo(function Box({ data, type }) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { info: data },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [data, type]
  );
  return (
    <div ref={drag} style={{ ...style, opacity }}>
      {data.name}
    </div>
  );
});
