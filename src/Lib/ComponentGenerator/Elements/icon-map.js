// Maps catalog tags → MUI icons used in the palette cards, and category id →
// accent color. Adding a new component is one import + one entry.

import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import TitleOutlinedIcon from "@mui/icons-material/TitleOutlined";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import CropSquareOutlinedIcon from "@mui/icons-material/CropSquareOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SmartButtonOutlinedIcon from "@mui/icons-material/SmartButtonOutlined";
import AdsClickOutlinedIcon from "@mui/icons-material/AdsClickOutlined";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import ViewWeekOutlinedIcon from "@mui/icons-material/ViewWeekOutlined";
import ViewStreamOutlinedIcon from "@mui/icons-material/ViewStreamOutlined";
import TableRowsOutlinedIcon from "@mui/icons-material/TableRowsOutlined";
import ViewModuleOutlinedIcon from "@mui/icons-material/ViewModuleOutlined";
import FormatSizeOutlinedIcon from "@mui/icons-material/FormatSizeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import HorizontalRuleOutlinedIcon from "@mui/icons-material/HorizontalRuleOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LinearScaleOutlinedIcon from "@mui/icons-material/LinearScaleOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import ViewCarouselOutlinedIcon from "@mui/icons-material/ViewCarouselOutlined";
import TabOutlinedIcon from "@mui/icons-material/TabOutlined";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import PivotTableChartOutlinedIcon from "@mui/icons-material/PivotTableChartOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";

const TAG_ICON = {
  // Layout
  CARD: ArticleOutlinedIcon,
  CARDHEADER: TitleOutlinedIcon,
  CARDCONTENT: ViewAgendaOutlinedIcon,
  CARDACTIONS: BoltOutlinedIcon,
  GRIDCONTAINER: GridViewOutlinedIcon,
  GRIDITEM: CropSquareOutlinedIcon,
  STACK: LayersOutlinedIcon,
  DIALOG: OpenInNewOutlinedIcon,
  DIALOGCONTENT: SubjectOutlinedIcon,
  DIALOGACTIONS: ControlPointOutlinedIcon,
  ACCORDION: ExpandCircleDownOutlinedIcon,
  // Inputs
  TEXTFIELD: TextFieldsOutlinedIcon,
  LABEL: LabelOutlinedIcon,
  CHECKBOX: CheckBoxOutlinedIcon,
  SELECT: ArrowDropDownCircleOutlinedIcon,
  AUTOCOMPLETE: SearchOutlinedIcon,
  BUTTON: SmartButtonOutlinedIcon,
  ICONBUTTON: AdsClickOutlinedIcon,
  SWITCH: ToggleOnOutlinedIcon,
  RADIOGROUP: RadioButtonCheckedOutlinedIcon,
  SLIDER: TuneOutlinedIcon,
  // Data Display
  TABLE: TableChartOutlinedIcon,
  TABLEHEADER: ViewWeekOutlinedIcon,
  TABLEBODY: ViewStreamOutlinedIcon,
  TABLEROW: TableRowsOutlinedIcon,
  TABLECELL: ViewModuleOutlinedIcon,
  TYPOGRAPHY: FormatSizeOutlinedIcon,
  AVATAR: AccountCircleOutlinedIcon,
  CHIP: LocalOfferOutlinedIcon,
  DIVIDER: HorizontalRuleOutlinedIcon,
  TOOLTIP: HelpOutlineOutlinedIcon,
  // Feedback
  ALERT: InfoOutlinedIcon,
  LINEAR_PROGRESS: LinearScaleOutlinedIcon,
  CIRCULAR_PROGRESS: LoopOutlinedIcon,
  SKELETON: ViewCarouselOutlinedIcon,
  // Navigation
  TABS: TabOutlinedIcon,
  STEPPER: LinearScaleIcon,
  BREADCRUMBS: NavigateNextOutlinedIcon,
  PAGINATION: PivotTableChartOutlinedIcon,
};

export function iconForTag(tag) {
  return TAG_ICON[tag] || WidgetsOutlinedIcon;
}

const CATEGORY_COLOR = {
  layout: "#6366F1", // indigo
  form: "#10B981", // emerald
  data: "#F59E0B", // amber
  feedback: "#EF4444", // red
  navigation: "#0EA5E9", // sky
};

export function colorForCategory(categoryId) {
  return CATEGORY_COLOR[categoryId] || "#6B7280";
}
