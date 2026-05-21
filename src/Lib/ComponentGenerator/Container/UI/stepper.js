import * as React from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import { makeLeafComponent } from "./Common/make-component";

const schema = [
  {
    name: "steps",
    label: "Steps",
    type: "json",
    group: "Content",
    span: "full",
    rows: 6,
    helper: "JSON array of { label, description?, optional? }",
  },
  {
    name: "activeStep",
    label: "Active step (0-based)",
    type: "number",
    group: "State",
    min: 0,
  },
  {
    name: "orientation",
    label: "Orientation",
    type: "select",
    group: "Appearance",
    options: ["horizontal", "vertical"],
  },
  {
    name: "alternativeLabel",
    label: "Alternative label",
    type: "boolean",
    group: "Appearance",
  },
  {
    name: "nonLinear",
    label: "Non-linear",
    type: "boolean",
    group: "Behavior",
  },
];

function normalize(steps) {
  if (Array.isArray(steps)) return steps;
  try {
    return JSON.parse(steps);
  } catch {
    return [];
  }
}

export const UI_Stepper = makeLeafComponent({
  schema,
  render: (props) => {
    const steps = normalize(props.steps) || [];
    const usable = steps.length
      ? steps
      : [{ label: "Step one" }, { label: "Step two" }, { label: "Step three" }];
    return (
      <Stepper
        activeStep={props.activeStep ?? 0}
        orientation={props.orientation || "horizontal"}
        alternativeLabel={props.alternativeLabel}
        nonLinear={props.nonLinear}
        sx={{ minWidth: 300 }}
      >
        {usable.map((s, i) => (
          <Step key={i}>
            <StepLabel
              optional={s.optional ? <span>Optional</span> : undefined}
            >
              {s.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    );
  },
});
