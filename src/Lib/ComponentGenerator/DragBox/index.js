import * as React from "react";
import { memo } from "react";
import { useDrag } from "react-dnd";
import { Box, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";

export const DragBox = memo(function DragBoxCard({
  data,
  type,
  icon: Icon = WidgetsOutlinedIcon,
  accent = "#6366F1",
}) {
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
    <Box
      ref={drag}
      role="button"
      tabIndex={0}
      aria-label={`Drag ${data.name}`}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        px: 1.25,
        py: 1.25,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        cursor: "grab",
        userSelect: "none",
        transition:
          "transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease",
        opacity,
        "&:hover": {
          borderColor: alpha(accent, 0.6),
          boxShadow: `0 4px 12px ${alpha(accent, 0.15)}`,
          transform: "translateY(-1px)",
        },
        "&:active": {
          cursor: "grabbing",
        },
      }}
    >
      <Stack
        sx={{
          width: 30,
          height: 30,
          borderRadius: 1,
          bgcolor: alpha(accent, 0.12),
          color: accent,
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon fontSize="small" />
      </Stack>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: "text.primary",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {data.name}
      </Typography>
    </Box>
  );
});
