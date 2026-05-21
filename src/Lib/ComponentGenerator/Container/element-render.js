import React from "react";

// Existing hand-rolled UI components
import { UI_GridContainer } from "./UI/grid-container";
import { UI_GridItem } from "./UI/grid-item";
import { UI_TextField } from "./UI/text-field";
import { UI_CheckBox } from "./UI/check-box";
import { UI_Stack } from "./UI/stack";
import { UI_SelectBox } from "./UI/select-box";
import { UI_Label } from "./UI/label";
import { UI_Card } from "./UI/card";
import { UI_CardHeader } from "./UI/card-header";
import { UI_CardContent } from "./UI/card-content";
import { UI_CardAction } from "./UI/card-action";
import { UI_Autocomplete } from "./UI/autocomplete";
import { UI_Table } from "./UI/table";
import { UI_TableHeader } from "./UI/table-header";
import { UI_TableBody } from "./UI/table-body";
import { UI_TableRow } from "./UI/table-row";
import { UI_TableCell } from "./UI/table-cell";
import { UI_Dialog } from "./UI/dialog";
import { UI_DialogContent } from "./UI/dialog-content";
import { UI_DialogActions } from "./UI/dialog-actions";

// New factory-built UI components
import { UI_Button } from "./UI/button";
import { UI_IconButton } from "./UI/icon-button";
import { UI_Switch } from "./UI/switch";
import { UI_RadioGroup } from "./UI/radio-group";
import { UI_Slider } from "./UI/slider";
import { UI_Typography } from "./UI/typography";
import { UI_Avatar } from "./UI/avatar";
import { UI_Chip } from "./UI/chip";
import { UI_Divider } from "./UI/divider";
import { UI_Tooltip } from "./UI/tooltip";
import { UI_Alert } from "./UI/alert";
import { UI_LinearProgress } from "./UI/linear-progress";
import { UI_CircularProgress } from "./UI/circular-progress";
import { UI_Skeleton } from "./UI/skeleton";
import { UI_Tabs } from "./UI/tabs";
import { UI_Stepper } from "./UI/stepper";
import { UI_Breadcrumbs } from "./UI/breadcrumbs";
import { UI_Pagination } from "./UI/pagination";
import { UI_Accordion } from "./UI/accordion";

// Tag → component registry. Adding a new component is one import + one entry.
const REGISTRY = {
  // Layout
  CARD: UI_Card,
  CARDHEADER: UI_CardHeader,
  CARDCONTENT: UI_CardContent,
  CARDACTIONS: UI_CardAction,
  GRIDCONTAINER: UI_GridContainer,
  GRIDITEM: UI_GridItem,
  STACK: UI_Stack,
  DIALOG: UI_Dialog,
  DIALOGCONTENT: UI_DialogContent,
  DIALOGACTIONS: UI_DialogActions,
  ACCORDION: UI_Accordion,
  // Form Elements
  TEXTFIELD: UI_TextField,
  LABEL: UI_Label,
  CHECKBOX: UI_CheckBox,
  SELECT: UI_SelectBox,
  AUTOCOMPLETE: UI_Autocomplete,
  BUTTON: UI_Button,
  ICONBUTTON: UI_IconButton,
  SWITCH: UI_Switch,
  RADIOGROUP: UI_RadioGroup,
  SLIDER: UI_Slider,
  // Data Display
  TABLE: UI_Table,
  TABLEHEADER: UI_TableHeader,
  TABLEBODY: UI_TableBody,
  TABLEROW: UI_TableRow,
  TABLECELL: UI_TableCell,
  TYPOGRAPHY: UI_Typography,
  AVATAR: UI_Avatar,
  CHIP: UI_Chip,
  DIVIDER: UI_Divider,
  TOOLTIP: UI_Tooltip,
  // Feedback
  ALERT: UI_Alert,
  LINEAR_PROGRESS: UI_LinearProgress,
  CIRCULAR_PROGRESS: UI_CircularProgress,
  SKELETON: UI_Skeleton,
  // Navigation
  TABS: UI_Tabs,
  STEPPER: UI_Stepper,
  BREADCRUMBS: UI_Breadcrumbs,
  PAGINATION: UI_Pagination,
};

export default function ElementRender({
  currentChild,
  handleonDrop,
  handleonDrop_Move,
  handleonHover_Move,
  children,
}) {
  const Cmp = REGISTRY[currentChild?.info?.tag];
  if (!Cmp) return null;
  return (
    <Cmp
      currentChild={currentChild}
      handleonDrop={handleonDrop}
      handleonDrop_Move={handleonDrop_Move}
      handleonHover_Move={handleonHover_Move}
    >
      {children}
    </Cmp>
  );
}
