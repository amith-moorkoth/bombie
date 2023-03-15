import elementBase from "./element-base";
import elementType from "./element-type";
const data = [
  {
    tag: elementBase.CARD.tag,
    name: elementBase.CARD.name,
    type: elementType.CARD,
    accept: [
      elementType.CARDHEADER,
      elementType.CARDCONTENT,
      elementType.CARDACTIONS,
    ],
  },
  {
    tag: elementBase.CARDHEADER.tag,
    name: elementBase.CARDHEADER.name,
    type: elementType.CARDHEADER,
    accept: [elementType.LAYOUT, elementType.STACK],
  },
  {
    tag: elementBase.CARDCONTENT.tag,
    name: elementBase.CARDCONTENT.name,
    type: elementType.CARDCONTENT,
    accept: [elementType.LAYOUT, elementType.STACK],
  },
  {
    tag: elementBase.CARDACTIONS.tag,
    name: elementBase.CARDACTIONS.name,
    type: elementType.CARDACTIONS,
    accept: [elementType.LAYOUT, elementType.STACK],
  },
  {
    tag: elementBase.GRIDCONTAINER.tag,
    name: elementBase.GRIDCONTAINER.name,
    type: elementType.LAYOUT,
    accept: [elementType.GRIDITEM, elementType.STACK, elementType.CARD],
  },
  {
    tag: elementBase.GRIDITEM.tag,
    name: elementBase.GRIDITEM.name,
    type: elementType.GRIDITEM,
    accept: [
      elementType.LAYOUT,
      elementType.INPUTS,
      elementType.DATA_DISPLAY,
      elementType.FEEDBACK,
      elementType.SURFACES,
      elementType.NAVIGATION,
      elementType.STACK,
      elementType.LABEL,
      elementType.TABLE,
    ],
  },
  {
    tag: elementBase.STACK.tag,
    name: elementBase.STACK.name,
    type: elementType.STACK,
    accept: [
      elementType.LAYOUT,
      elementType.INPUTS,
      elementType.DATA_DISPLAY,
      elementType.FEEDBACK,
      elementType.SURFACES,
      elementType.NAVIGATION,
      elementType.LABEL,
      elementType.TABLE,
    ],
  },
  {
    tag: elementBase.TEXTFIELD.tag,
    name: elementBase.TEXTFIELD.name,
    type: elementType.INPUTS,
    accept: [elementType.NONE],
  },
  {
    tag: elementBase.LABEL.tag,
    name: elementBase.LABEL.name,
    type: elementType.LABEL,
    accept: [elementType.NONE],
  },
  {
    tag: elementBase.CHECKBOX.tag,
    name: elementBase.CHECKBOX.name,
    type: elementType.INPUTS,
    accept: [elementType.NONE],
  },
  {
    tag: elementBase.SELECT.tag,
    name: elementBase.SELECT.name,
    type: elementType.INPUTS,
    accept: [elementType.NONE],
  },
  {
    tag: elementBase.AUTOCOMPLETE.tag,
    name: elementBase.AUTOCOMPLETE.name,
    type: elementType.INPUTS,
    accept: [elementType.NONE],
  },
  {
    tag: elementBase.TABLE.tag,
    name: elementBase.TABLE.name,
    type: elementType.TABLE,
    accept: [elementType.TABLEHEADER_BODY],
  },
  {
    tag: elementBase.TABLEHEADER.tag,
    name: elementBase.TABLEHEADER.name,
    type: elementType.TABLEHEADER_BODY,
    accept: [elementType.TABLEROW],
  },
  {
    tag: elementBase.TABLEBODY.tag,
    name: elementBase.TABLEBODY.name,
    type: elementType.TABLEHEADER_BODY,
    accept: [elementType.TABLEROW],
  },
  {
    tag: elementBase.TABLEROW.tag,
    name: elementBase.TABLEROW.name,
    type: elementType.TABLEROW,
    accept: [elementType.TABLECELL],
  },
  {
    tag: elementBase.TABLECELL.tag,
    name: elementBase.TABLECELL.name,
    type: elementType.TABLECELL,
    accept: [elementType.INPUTS, elementType.LABEL],
  },
  {
    tag: elementBase.DIALOG.tag,
    name: elementBase.DIALOG.name,
    type: elementType.LAYOUT,
    accept: [elementType.DIALOGCONTENT, elementType.DIALOGACTIONS],
  },
  {
    tag: elementBase.DIALOGCONTENT.tag,
    name: elementBase.DIALOGCONTENT.name,
    type: elementType.DIALOGCONTENT,
    accept: [elementType.LAYOUT],
  },
  {
    tag: elementBase.DIALOGACTIONS.tag,
    name: elementBase.DIALOGACTIONS.name,
    type: elementType.DIALOGACTIONS,
    accept: [elementType.LAYOUT],
  },
];

export default data;
