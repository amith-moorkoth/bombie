import * as React from "react";
import { memo } from "react";
import { useDrop } from "react-dnd";
import Container from "@mui/material/Container";
import { useRef } from "react";

const style = {
  border: "1px dashed gray",
  padding: "10px",
  paddingTop: "15px",
  paddingBottom: "15px",
  boxShadow: "0px 0px 0px 6px #e3f2fd inset",
  position: "relative",
  //"min-height": "100px",
};
export const DropBox = memo(function DropBox({
  accept,
  handleonDrop,
  handleonDrop_Move,
  handleonHover_Move,
  children,
  ...props
}) {
  const ref = useRef(null);
  accept = [...accept, "MOVEBUTTON"];
  const greedy = true;
  const [{ isOver, canDrop, isOverCurrent }, drop] = useDrop({
    accept,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop && greedy) {
        return;
      }
      if (item?.action !== "MOVE") {
        handleonDrop(item);
      } else {
        handleonDrop_Move(item);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
    hover(item, monitor) {
      //console.log("here");
      if (!ref.current) {
        return;
      }
      if (!monitor.isOver({ shallow: true })) return;
      if (item?.action === "MOVE") {
        //handleonHover_Move(item);
      }
    },
  });

  //const isActive = isOver && canDrop;
  const isActive = isOverCurrent || (isOver && !greedy);
  let backgroundColor = "white";
  if (isActive) {
    backgroundColor = "#bbdefb";
  } else if (canDrop) {
    backgroundColor = "#f5f5f5";
  }
  drop(ref);
  return (
    <Container
      maxWidth="xl"
      ref={ref}
      style={{ ...style, backgroundColor }}
      {...props}
    >
      {isActive && "Release to drop"}
      {children}
    </Container>
  );
});
