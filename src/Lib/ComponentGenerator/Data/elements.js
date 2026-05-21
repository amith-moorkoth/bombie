import elementBase from "./element-base";
import elementType from "./element-type";

// Catalog of palette items.
//   - tag/name come from element-base (single source of display strings)
//   - type drives where this element may be dropped (matched against an
//     ancestor's `accept[]`)
//   - accept lists the element types this element will host as children
//     ([NONE] for leaf elements)
const data = [
  // ---------- Layout ----------
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
    accept: [elementType.LAYOUT, elementType.STACK, elementType.INPUTS],
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
      elementType.ACCORDION,
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
      elementType.ACCORDION,
    ],
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
    accept: [elementType.LAYOUT, elementType.STACK],
  },
  {
    tag: elementBase.DIALOGACTIONS.tag,
    name: elementBase.DIALOGACTIONS.name,
    type: elementType.DIALOGACTIONS,
    accept: [elementType.LAYOUT, elementType.STACK, elementType.INPUTS],
  },
  {
    tag: elementBase.ACCORDION.tag,
    name: elementBase.ACCORDION.name,
    type: elementType.ACCORDION,
    accept: [
      elementType.LAYOUT,
      elementType.STACK,
      elementType.INPUTS,
      elementType.DATA_DISPLAY,
      elementType.FEEDBACK,
    ],
  },

  // ---------- Form Elements (Inputs) ----------
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
    tag: elementBase.BUTTON.tag,
    name: elementBase.BUTTON.name,
    type: elementType.INPUTS,
    accept: [elementType.NONE],
  },
  {
    tag: elementBase.ICONBUTTON.tag,
    name: elementBase.ICONBUTTON.name,
    type: elementType.INPUTS,
    accept: [elementType.NONE],
  },
  {
    tag: elementBase.SWITCH.tag,
    name: elementBase.SWITCH.name,
    type: elementType.INPUTS,
    accept: [elementType.NONE],
  },
  {
    tag: elementBase.RADIOGROUP.tag,
    name: elementBase.RADIOGROUP.name,
    type: elementType.INPUTS,
    accept: [elementType.NONE],
  },
  {
    tag: elementBase.SLIDER.tag,
    name: elementBase.SLIDER.name,
    type: elementType.INPUTS,
    accept: [elementType.NONE],
  },

  // ---------- Data Display ----------
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
    accept: [elementType.INPUTS, elementType.LABEL, elementType.DATA_DISPLAY],
  },
  {
    tag: elementBase.TYPOGRAPHY.tag,
    name: elementBase.TYPOGRAPHY.name,
    type: elementType.DATA_DISPLAY,
    accept: [elementType.NONE],
  },
  {
    tag: elementBase.AVATAR.tag,
    name: elementBase.AVATAR.name,
    type: elementType.DATA_DISPLAY,
    accept: [elementType.NONE],
  },
  {
    tag: elementBase.CHIP.tag,
    name: elementBase.CHIP.name,
    type: elementType.DATA_DISPLAY,
    accept: [elementType.NONE],
  },
  {
    tag: elementBase.DIVIDER.tag,
    name: elementBase.DIVIDER.name,
    type: elementType.DATA_DISPLAY,
    accept: [elementType.NONE],
  },
  {
    tag: elementBase.TOOLTIP.tag,
    name: elementBase.TOOLTIP.name,
    type: elementType.DATA_DISPLAY,
    accept: [elementType.NONE],
  },

  // ---------- Feedback ----------
  {
    tag: elementBase.ALERT.tag,
    name: elementBase.ALERT.name,
    type: elementType.FEEDBACK,
    accept: [elementType.NONE],
  },
  {
    tag: elementBase.LINEAR_PROGRESS.tag,
    name: elementBase.LINEAR_PROGRESS.name,
    type: elementType.FEEDBACK,
    accept: [elementType.NONE],
  },
  {
    tag: elementBase.CIRCULAR_PROGRESS.tag,
    name: elementBase.CIRCULAR_PROGRESS.name,
    type: elementType.FEEDBACK,
    accept: [elementType.NONE],
  },
  {
    tag: elementBase.SKELETON.tag,
    name: elementBase.SKELETON.name,
    type: elementType.FEEDBACK,
    accept: [elementType.NONE],
  },

  // ---------- Navigation ----------
  {
    tag: elementBase.TABS.tag,
    name: elementBase.TABS.name,
    type: elementType.NAVIGATION,
    accept: [elementType.NONE],
  },
  {
    tag: elementBase.STEPPER.tag,
    name: elementBase.STEPPER.name,
    type: elementType.NAVIGATION,
    accept: [elementType.NONE],
  },
  {
    tag: elementBase.BREADCRUMBS.tag,
    name: elementBase.BREADCRUMBS.name,
    type: elementType.NAVIGATION,
    accept: [elementType.NONE],
  },
  {
    tag: elementBase.PAGINATION.tag,
    name: elementBase.PAGINATION.name,
    type: elementType.NAVIGATION,
    accept: [elementType.NONE],
  },
];

export default data;
