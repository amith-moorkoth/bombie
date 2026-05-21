import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeContainerComponent } from "./Common/make-component";

const schema = [
  {
    name: "title",
    label: "Title",
    type: "text",
    group: "Content",
    span: "full",
  },
  {
    name: "defaultExpanded",
    label: "Default expanded",
    type: "boolean",
    group: "State",
  },
  { name: "disabled", label: "Disabled", type: "boolean", group: "State" },
  {
    name: "disableGutters",
    label: "Disable gutters",
    type: "boolean",
    group: "Appearance",
  },
  {
    name: "square",
    label: "Square corners",
    type: "boolean",
    group: "Appearance",
  },
  {
    name: "variant",
    label: "Variant",
    type: "select",
    group: "Appearance",
    options: ["elevation", "outlined"],
  },
];

export const UI_Accordion = makeContainerComponent({
  schema,
  render: (props, children) => (
    <Accordion
      defaultExpanded={props.defaultExpanded}
      disabled={props.disabled}
      disableGutters={props.disableGutters}
      square={props.square}
      variant={props.variant || "elevation"}
      sx={{ width: "100%" }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{props.title || "Section title"}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  ),
});
