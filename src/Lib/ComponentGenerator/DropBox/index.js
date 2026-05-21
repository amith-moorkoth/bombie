import * as React from "react";
import { memo, useRef } from "react";
import { useDrop } from "react-dnd";
import { Box, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

export const DropBox = memo(function DropBox({
  accept,
  handleonDrop,
  handleonDrop_Move,
  handleonHover_Move,
  children,
  ...props
}) {
  const theme = useTheme();
  const ref = useRef(null);
  accept = [...accept, "MOVEBUTTON"];
  const greedy = true;

  const [{ isOver, canDrop, isOverCurrent }, drop] = useDrop({
    accept,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop && greedy) return;
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
    hover(_item, monitor) {
      if (!ref.current) return;
      if (!monitor.isOver({ shallow: true })) return;
    },
  });

  const isActive = isOverCurrent || (isOver && !greedy);

  // Style states (idle → can-drop → active hover). Stays subtle so user-built
  // content isn't drowned by the drop-zone chrome.
  let bg = "transparent";
  let border = `1px dashed ${theme.palette.divider}`;
  if (isActive) {
    bg = alpha(theme.palette.primary.main, 0.08);
    border = `1px dashed ${theme.palette.primary.main}`;
  } else if (canDrop) {
    bg = alpha(theme.palette.primary.main, 0.03);
  }

  drop(ref);

  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        borderRadius: 2,
        border,
        backgroundColor: bg,
        p: 1.5,
        transition: "background-color 120ms ease, border-color 120ms ease",
        minHeight: 80,
      }}
      {...props}
    >
      {isActive && (
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            top: 6,
            right: 10,
            color: "primary.main",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Release to drop
        </Typography>
      )}
      {children}
    </Box>
  );
});
