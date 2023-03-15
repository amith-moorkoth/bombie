import React from "react";
import eleBase from "../Data/element-base";
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

export default function ElementRender({
  currentChild,
  handleonDrop,
  handleonDrop_Move,
  handleonHover_Move,
  children,
}) {
  //const bombedbComponent = ItemTypes.find((obj) => obj.id === currentChild.tag);
  if (currentChild.info.tag === eleBase.CARD.tag) {
    return (
      <UI_Card
        currentChild={currentChild}
        handleonDrop={handleonDrop}
        handleonDrop_Move={handleonDrop_Move}
        handleonHover_Move={handleonHover_Move}
      >
        {children}
      </UI_Card>
    );
  }
  if (currentChild.info.tag === eleBase.CARDHEADER.tag) {
    return (
      <UI_CardHeader
        currentChild={currentChild}
        handleonDrop={handleonDrop}
        handleonDrop_Move={handleonDrop_Move}
        handleonHover_Move={handleonHover_Move}
      >
        {children}
      </UI_CardHeader>
    );
  }
  if (currentChild.info.tag === eleBase.CARDCONTENT.tag) {
    return (
      <UI_CardContent
        currentChild={currentChild}
        handleonDrop={handleonDrop}
        handleonDrop_Move={handleonDrop_Move}
        handleonHover_Move={handleonHover_Move}
      >
        {children}
      </UI_CardContent>
    );
  }
  if (currentChild.info.tag === eleBase.CARDACTIONS.tag) {
    return (
      <UI_CardAction
        currentChild={currentChild}
        handleonDrop={handleonDrop}
        handleonDrop_Move={handleonDrop_Move}
        handleonHover_Move={handleonHover_Move}
      >
        {children}
      </UI_CardAction>
    );
  }
  if (currentChild.info.tag === eleBase.GRIDCONTAINER.tag) {
    return (
      <UI_GridContainer
        currentChild={currentChild}
        handleonDrop={handleonDrop}
        handleonDrop_Move={handleonDrop_Move}
        handleonHover_Move={handleonHover_Move}
      >
        {children}
      </UI_GridContainer>
    );
  }
  if (currentChild.info.tag === eleBase.GRIDITEM.tag) {
    return (
      <UI_GridItem
        currentChild={currentChild}
        handleonDrop={handleonDrop}
        handleonDrop_Move={handleonDrop_Move}
        handleonHover_Move={handleonHover_Move}
      >
        {children}
      </UI_GridItem>
    );
  }
  if (currentChild.info.tag === eleBase.STACK.tag) {
    return (
      <UI_Stack
        currentChild={currentChild}
        handleonDrop={handleonDrop}
        handleonDrop_Move={handleonDrop_Move}
        handleonHover_Move={handleonHover_Move}
      >
        {children}
      </UI_Stack>
    );
  }

  if (currentChild.info.tag === eleBase.TEXTFIELD.tag) {
    return (
      <UI_TextField
        currentChild={currentChild}
        handleonDrop={handleonDrop}
        handleonDrop_Move={handleonDrop_Move}
        handleonHover_Move={handleonHover_Move}
      >
        {children}
      </UI_TextField>
    );
  }

  if (currentChild.info.tag === eleBase.LABEL.tag) {
    return (
      <UI_Label
        currentChild={currentChild}
        handleonDrop={handleonDrop}
        handleonDrop_Move={handleonDrop_Move}
        handleonHover_Move={handleonHover_Move}
      >
        {children}
      </UI_Label>
    );
  }

  if (currentChild.info.tag === eleBase.CHECKBOX.tag) {
    return (
      <UI_CheckBox
        currentChild={currentChild}
        handleonDrop={handleonDrop}
        handleonDrop_Move={handleonDrop_Move}
        handleonHover_Move={handleonHover_Move}
      >
        {children}
      </UI_CheckBox>
    );
  }

  if (currentChild.info.tag === eleBase.SELECT.tag) {
    return (
      <UI_SelectBox
        currentChild={currentChild}
        handleonDrop={handleonDrop}
        handleonDrop_Move={handleonDrop_Move}
        handleonHover_Move={handleonHover_Move}
      >
        {children}
      </UI_SelectBox>
    );
  }

  if (currentChild.info.tag === eleBase.AUTOCOMPLETE.tag) {
    return (
      <UI_Autocomplete
        currentChild={currentChild}
        handleonDrop={handleonDrop}
        handleonDrop_Move={handleonDrop_Move}
        handleonHover_Move={handleonHover_Move}
      >
        {children}
      </UI_Autocomplete>
    );
  }

  if (currentChild.info.tag === eleBase.TABLE.tag) {
    return (
      <UI_Table
        currentChild={currentChild}
        handleonDrop={handleonDrop}
        handleonDrop_Move={handleonDrop_Move}
        handleonHover_Move={handleonHover_Move}
      >
        {children}
      </UI_Table>
    );
  }

  if (currentChild.info.tag === eleBase.TABLEHEADER.tag) {
    return (
      <UI_TableHeader
        currentChild={currentChild}
        handleonDrop={handleonDrop}
        handleonDrop_Move={handleonDrop_Move}
        handleonHover_Move={handleonHover_Move}
      >
        {children}
      </UI_TableHeader>
    );
  }

  if (currentChild.info.tag === eleBase.TABLEBODY.tag) {
    return (
      <UI_TableBody
        currentChild={currentChild}
        handleonDrop={handleonDrop}
        handleonDrop_Move={handleonDrop_Move}
        handleonHover_Move={handleonHover_Move}
      >
        {children}
      </UI_TableBody>
    );
  }

  if (currentChild.info.tag === eleBase.TABLEROW.tag) {
    return (
      <UI_TableRow
        currentChild={currentChild}
        handleonDrop={handleonDrop}
        handleonDrop_Move={handleonDrop_Move}
        handleonHover_Move={handleonHover_Move}
      >
        {children}
      </UI_TableRow>
    );
  }
  if (currentChild.info.tag === eleBase.TABLECELL.tag) {
    return (
      <UI_TableCell
        currentChild={currentChild}
        handleonDrop={handleonDrop}
        handleonDrop_Move={handleonDrop_Move}
        handleonHover_Move={handleonHover_Move}
      >
        {children}
      </UI_TableCell>
    );
  }
  if (currentChild.info.tag === eleBase.DIALOG.tag) {
    return (
      <UI_Dialog
        currentChild={currentChild}
        handleonDrop={handleonDrop}
        handleonDrop_Move={handleonDrop_Move}
        handleonHover_Move={handleonHover_Move}
      >
        {children}
      </UI_Dialog>
    );
  }
  if (currentChild.info.tag === eleBase.DIALOGCONTENT.tag) {
    return (
      <UI_DialogContent
        currentChild={currentChild}
        handleonDrop={handleonDrop}
        handleonDrop_Move={handleonDrop_Move}
        handleonHover_Move={handleonHover_Move}
      >
        {children}
      </UI_DialogContent>
    );
  }
  if (currentChild.info.tag === eleBase.DIALOGACTIONS.tag) {
    return (
      <UI_DialogActions
        currentChild={currentChild}
        handleonDrop={handleonDrop}
        handleonDrop_Move={handleonDrop_Move}
        handleonHover_Move={handleonHover_Move}
      >
        {children}
      </UI_DialogActions>
    );
  }

  //default
  return "";
}
