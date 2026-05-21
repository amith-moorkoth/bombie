import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Autocomplete,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  Link,
  MenuItem,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Slider,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import * as Icons from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";

/**
 * Context provided by an open <Dialog> in the preview. Buttons rendered
 * inside the dialog tree consume this to close the modal on click — gives
 * the user a real "Cancel" / "Submit" UX without each Button having to know
 * about dialogs explicitly.
 */
const DialogCloseContext = React.createContext(null);

/**
 * Clean rendering of a builder tree as plain Material-UI — no DropBox,
 * UIController, or property panels. Used by the Preview dialog and any
 * future "publish" pipeline. The switch lives in one place by tag so adding
 * a new component just means adding a branch here.
 */

function resolveIcon(name) {
  return Icons[name] || StarIcon;
}

function toNum(value, fallback) {
  if (value === undefined || value === "") return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

// Parse a Grid breakpoint value. Accepts 1-12, "auto", true/false, or unset.
function parseBp(value, fallback) {
  if (value === undefined || value === "" || value === null) return fallback;
  if (value === "auto") return "auto";
  if (value === "true" || value === true) return true;
  if (value === "false" || value === false) return false;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function asSize(value, fallback) {
  if (value === undefined || value === "") return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : value;
}

function safeJson(value, fallback = []) {
  if (Array.isArray(value)) return value;
  if (typeof value === "object" && value !== null) return value;
  if (typeof value !== "string") return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function renderChildren(children) {
  return (children || []).map((c) => <PreviewNode key={c.id} node={c} />);
}

// Tag-specific renderers. Each receives the node's props + already-rendered
// children and returns clean MUI. Unknown tags are silently skipped — they
// don't crash the preview.
const RENDERERS = {
  // --------------- Layout ---------------
  CARD: (p, kids) => (
    <Card
      variant={p.variant || "elevation"}
      elevation={
        p.elevation !== undefined ? toNum(p.elevation, undefined) : undefined
      }
      raised={p.raised}
      square={p.square}
      sx={{
        width: "100%",
        maxWidth: p.maxWidth || undefined,
        mx: p.maxWidth ? "auto" : undefined,
        p: p.padding !== undefined ? toNum(p.padding, undefined) : undefined,
        bgcolor: p.bgcolor || undefined,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {kids}
    </Card>
  ),
  CARDHEADER: (p, kids) => (
    <>
      {p.showDivider && (
        <Box sx={{ height: 4, bgcolor: p.dividerColor || "primary.main" }} />
      )}
      <CardHeader
        title={p.title}
        subheader={p.subheader}
        avatar={
          p.avatarText ? (
            <Avatar
              variant={p.avatarVariant || "circular"}
              sx={{ bgcolor: p.avatarBg || "primary.main" }}
            >
              {p.avatarText}
            </Avatar>
          ) : undefined
        }
        action={kids && React.Children.count(kids) ? kids : undefined}
        sx={{
          p: p.padding !== undefined ? toNum(p.padding, undefined) : undefined,
          "& .MuiCardHeader-content": { textAlign: p.align || undefined },
        }}
      />
    </>
  ),
  CARDCONTENT: (p, kids) => (
    <CardContent
      sx={{
        p: p.padding !== undefined ? toNum(p.padding, undefined) : undefined,
        bgcolor: p.bgcolor || undefined,
        "&:last-child": p.removeLastChildPadding ? { pb: 0 } : undefined,
      }}
    >
      {kids}
    </CardContent>
  ),
  CARDACTIONS: (p, kids) => (
    <CardActions
      disableSpacing={p.disableSpacing}
      sx={{
        p: p.padding !== undefined ? toNum(p.padding, undefined) : undefined,
        justifyContent: p.justifyContent || "flex-end",
        alignItems: p.alignItems || undefined,
        gap: p.spacing !== undefined ? `${toNum(p.spacing, 8)}px` : undefined,
      }}
    >
      {kids}
    </CardActions>
  ),
  GRIDCONTAINER: (p, kids) => (
    // alignSelf: stretch overrides the outer Stack's alignItems: center so
    // the grid spans full preview width instead of shrinking to content.
    <Grid
      container
      spacing={p.spacing !== undefined ? toNum(p.spacing, 2) : 2}
      rowSpacing={
        p.rowSpacing !== undefined ? toNum(p.rowSpacing, undefined) : undefined
      }
      columnSpacing={
        p.columnSpacing !== undefined
          ? toNum(p.columnSpacing, undefined)
          : undefined
      }
      direction={p.direction || undefined}
      wrap={p.wrap || undefined}
      alignItems={p.alignItems || undefined}
      justifyContent={p.justifyContent || undefined}
      columns={
        p.columns !== undefined ? toNum(p.columns, undefined) : undefined
      }
      sx={{ alignSelf: "stretch" }}
    >
      {kids}
    </Grid>
  ),
  GRIDITEM: (p, kids) => (
    <Grid
      item
      xs={parseBp(p.xs, 12)}
      sm={parseBp(p.sm, undefined)}
      md={parseBp(p.md, undefined)}
      lg={parseBp(p.lg, undefined)}
      xl={parseBp(p.xl, undefined)}
      zeroMinWidth={Boolean(p.zeroMinWidth)}
    >
      {kids}
    </Grid>
  ),
  STACK: (p, kids) => {
    const direction = p.direction || "column";
    const horizontal = direction === "row" || direction === "row-reverse";
    return (
      <Stack
        direction={direction}
        spacing={p.spacing !== undefined ? toNum(p.spacing, 1) : 1}
        alignItems={p.alignItems || undefined}
        justifyContent={p.justifyContent || undefined}
        flexWrap={p.flexWrap || undefined}
        useFlexGap={Boolean(p.useFlexGap)}
        divider={
          p.divider ? (
            <div
              style={{
                flexShrink: 0,
                alignSelf: "stretch",
                backgroundColor: "rgba(0,0,0,0.12)",
                width: horizontal ? 1 : "100%",
                height: horizontal ? "100%" : 1,
              }}
            />
          ) : undefined
        }
        // minWidth: 0 lets row stacks shrink instead of overflowing when an
        // inner element (e.g. long Chip label) is wider than its share.
        sx={{
          minWidth: 0,
          p: p.padding !== undefined ? toNum(p.padding, undefined) : undefined,
          maxWidth: p.maxWidth || undefined,
          bgcolor: p.bgcolor || undefined,
        }}
      >
        {kids}
      </Stack>
    );
  },
  DIALOG: (p, kids) => <DialogPreview p={p} kids={kids} />,
  DIALOGCONTENT: (p, kids) => (
    <Box
      sx={{
        p: p.padding !== undefined ? toNum(p.padding, undefined) : 2,
        bgcolor: p.bgcolor || undefined,
        borderTop: p.dividers ? "1px solid" : undefined,
        borderBottom: p.dividers ? "1px solid" : undefined,
        borderColor: "divider",
      }}
    >
      {p.dialogContentText && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, whiteSpace: "pre-wrap" }}
        >
          {p.dialogContentText}
        </Typography>
      )}
      {kids}
    </Box>
  ),
  DIALOGACTIONS: (p, kids) => (
    <Box
      sx={{
        display: "flex",
        alignItems: p.alignItems || "center",
        justifyContent: p.justifyContent || "flex-end",
        gap: p.gap !== undefined ? `${toNum(p.gap, 8)}px` : "8px",
        p: p.padding !== undefined ? toNum(p.padding, undefined) : 2,
        borderTop: p.topBorder ? "1px solid" : undefined,
        borderColor: "divider",
      }}
    >
      {kids}
    </Box>
  ),
  ACCORDION: (p, kids) => (
    <Accordion
      defaultExpanded={p.defaultExpanded}
      disabled={p.disabled}
      disableGutters={p.disableGutters}
      square={p.square}
      variant={p.variant || "elevation"}
      sx={{ width: "100%" }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{p.title || "Section title"}</Typography>
      </AccordionSummary>
      <AccordionDetails>{kids}</AccordionDetails>
    </Accordion>
  ),

  // --------------- Form Elements ---------------
  TEXTFIELD: (p) => (
    <TextField
      label={p.label}
      placeholder={p.placeholder}
      defaultValue={p.defaultValue}
      helperText={p.helperText}
      type={p.type || "text"}
      autoComplete={p.autoComplete}
      // eslint-disable-next-line jsx-a11y/no-autofocus -- user-configurable
      autoFocus={p.autoFocus}
      required={p.required}
      disabled={p.disabled}
      InputProps={{ readOnly: p.readOnly }}
      error={p.error}
      variant={p.variant || "outlined"}
      size={p.size || "medium"}
      color={p.color || "primary"}
      margin={p.margin || "none"}
      fullWidth={p.fullWidth}
      multiline={p.multiline}
      rows={p.multiline ? toNum(p.rows, undefined) : undefined}
      maxRows={p.multiline ? toNum(p.maxRows, undefined) : undefined}
    />
  ),
  LABEL: (p) => (
    <Typography
      variant={p.variant || "body1"}
      component={p.component || undefined}
      color={p.color || undefined}
      gutterBottom={p.gutterBottom}
      noWrap={p.noWrap}
      sx={{
        textAlign: p.textAlign || undefined,
        fontWeight: p.fontWeight ? Number(p.fontWeight) : undefined,
        fontStyle: p.fontStyle || undefined,
        textTransform: p.textTransform || undefined,
      }}
    >
      {p.label || "Label"}
    </Typography>
  ),
  CHECKBOX: (p) => (
    <FormControlLabel
      label={p.label || ""}
      labelPlacement={p.labelPlacement || "end"}
      disabled={p.disabled}
      required={p.required}
      control={
        <Checkbox
          defaultChecked={p.defaultChecked}
          indeterminate={p.indeterminate}
          disabled={p.disabled}
          color={p.color || "primary"}
          size={p.size || "medium"}
        />
      }
    />
  ),
  SELECT: (p) => {
    const options = safeJson(p.options) || [];
    return (
      <FormControl
        size={p.size || "medium"}
        variant={p.variant || "outlined"}
        color={p.color || "primary"}
        margin={p.margin || "none"}
        required={p.required}
        disabled={p.disabled}
        error={p.error}
        fullWidth={p.fullWidth}
      >
        {p.label && <InputLabel>{p.label}</InputLabel>}
        <Select
          label={p.label}
          defaultValue={p.multiple ? [] : (p.defaultValue ?? "")}
          multiple={Boolean(p.multiple)}
          autoWidth={Boolean(p.autoWidth)}
          displayEmpty={Boolean(p.displayEmpty)}
        >
          {options.map((o, i) => {
            const value = o?.value ?? o;
            const label = o?.label ?? String(o);
            return (
              <MenuItem key={value ?? i} value={value} disabled={o?.disabled}>
                {label}
              </MenuItem>
            );
          })}
        </Select>
        {p.helperText && (
          <Typography
            variant="caption"
            color={p.error ? "error" : "text.secondary"}
            sx={{ ml: 1.5, mt: 0.5 }}
          >
            {p.helperText}
          </Typography>
        )}
      </FormControl>
    );
  },
  AUTOCOMPLETE: (p) => {
    const options = safeJson(p.options) || [];
    const labelKey = p.getOptionLabel;
    return (
      <Autocomplete
        disablePortal
        options={options}
        size={p.size || "medium"}
        fullWidth={p.fullWidth}
        disabled={p.disabled}
        freeSolo={Boolean(p.freeSolo)}
        multiple={Boolean(p.multiple)}
        disableClearable={Boolean(p.disableClearable)}
        autoHighlight={Boolean(p.autoHighlight)}
        openOnFocus={Boolean(p.openOnFocus)}
        blurOnSelect={Boolean(p.blurOnSelect)}
        selectOnFocus={Boolean(p.selectOnFocus)}
        getOptionLabel={(opt) => {
          if (typeof opt === "string") return opt;
          if (labelKey) {
            const v = labelKey
              .split(".")
              .reduce((acc, k) => (acc == null ? acc : acc[k]), opt);
            return v != null ? String(v) : "";
          }
          return opt?.label ?? "";
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={p.label}
            placeholder={p.placeholder}
            helperText={p.helperText}
            variant={p.variant || "outlined"}
            required={p.required}
            error={p.error}
          />
        )}
      />
    );
  },
  BUTTON: (p) => <PreviewButton p={p} />,
  ICONBUTTON: (p) => {
    const Icon = resolveIcon(p.icon || "Star");
    return (
      <IconButton
        color={p.color || "default"}
        size={p.size || "medium"}
        edge={p.edge === "false" ? false : p.edge}
        disabled={p.disabled}
        aria-label={p.ariaLabel || p.icon || "icon button"}
      >
        <Icon />
      </IconButton>
    );
  },
  SWITCH: (p) => (
    <FormControlLabel
      label={p.label || ""}
      labelPlacement={p.labelPlacement || "end"}
      disabled={p.disabled}
      required={p.required}
      control={
        <Switch
          defaultChecked={p.defaultChecked}
          color={p.color || "primary"}
          size={p.size || "medium"}
          disabled={p.disabled}
        />
      }
    />
  ),
  RADIOGROUP: (p) => {
    const options = safeJson(p.options) || [];
    return (
      <FormControl disabled={p.disabled}>
        {p.label && <FormLabel>{p.label}</FormLabel>}
        <RadioGroup row={p.row} defaultValue={p.defaultValue}>
          {options.map((o, i) => (
            <FormControlLabel
              key={o?.value ?? i}
              value={o?.value}
              label={o?.label}
              control={
                <Radio color={p.color || "primary"} size={p.size || "medium"} />
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  },
  SLIDER: (p) => (
    <Box sx={{ minWidth: 200, px: 1 }}>
      {p.label && (
        <Typography variant="body2" gutterBottom>
          {p.label}
        </Typography>
      )}
      <Slider
        defaultValue={toNum(p.defaultValue, 50)}
        min={toNum(p.min, 0)}
        max={toNum(p.max, 100)}
        step={toNum(p.step, 1)}
        marks={p.marks}
        valueLabelDisplay={p.valueLabelDisplay || "auto"}
        color={p.color || "primary"}
        size={p.size || "medium"}
        orientation={p.orientation || "horizontal"}
        disabled={p.disabled}
        sx={{ height: p.orientation === "vertical" ? 200 : undefined }}
      />
    </Box>
  ),

  // --------------- Data Display ---------------
  TABLE: (p, kids) => (
    <Paper
      variant={p.variant || "elevation"}
      elevation={p.elevation !== undefined ? toNum(p.elevation, 1) : 1}
      sx={{
        width: "100%",
        maxHeight: p.maxHeight || undefined,
        overflow: "auto",
      }}
    >
      <Table
        size={p.size || "medium"}
        padding={p.padding || "normal"}
        stickyHeader={Boolean(p.stickyHeader)}
        sx={{ minWidth: p.minWidth || undefined }}
      >
        {kids}
      </Table>
    </Paper>
  ),
  TABLEHEADER: (p, kids) => <TableHead>{kids}</TableHead>,
  TABLEBODY: (p, kids) => (
    <TableBody
      sx={
        p.striped
          ? { "& > tr:nth-of-type(odd)": { bgcolor: "grey.50" } }
          : undefined
      }
    >
      {kids}
    </TableBody>
  ),
  TABLEROW: (p, kids) => (
    <TableRow
      hover={Boolean(p.hover)}
      selected={Boolean(p.selected)}
      sx={{
        minHeight: p.minHeight || undefined,
        bgcolor: p.bgcolor || undefined,
      }}
    >
      {kids}
    </TableRow>
  ),
  TABLECELL: (p, kids) => (
    <TableCell
      align={p.align && p.align !== "inherit" ? p.align : undefined}
      padding={p.padding || "normal"}
      component={p.header ? "th" : "td"}
      scope={p.header ? "col" : undefined}
      sx={{
        width: p.width || undefined,
        minWidth: p.minWidth || undefined,
        fontWeight: p.fontWeight
          ? Number(p.fontWeight)
          : p.header
            ? 600
            : undefined,
        bgcolor: p.bgcolor || undefined,
      }}
    >
      {React.Children.count(kids) ? kids : p.text}
    </TableCell>
  ),
  TYPOGRAPHY: (p) => (
    <Typography
      variant={p.variant || "body1"}
      component={p.component || undefined}
      color={p.color || undefined}
      align={p.align || "inherit"}
      gutterBottom={p.gutterBottom}
      noWrap={p.noWrap}
      sx={{ fontWeight: p.fontWeight ? Number(p.fontWeight) : undefined }}
    >
      {p.text || "Typography text"}
    </Typography>
  ),
  AVATAR: (p) => {
    const size = toNum(p.size, 40);
    return (
      <Avatar
        src={p.src}
        alt={p.alt}
        variant={p.variant || "circular"}
        sx={{
          width: size,
          height: size,
          bgcolor: p.bgcolor,
          alignSelf: "flex-start",
          flexShrink: 0,
        }}
      >
        {p.children || (p.alt || "?")[0]?.toUpperCase()}
      </Avatar>
    );
  },
  CHIP: (p) => (
    <Chip
      label={p.label || "Chip"}
      variant={p.variant || "filled"}
      color={p.color || "default"}
      size={p.size || "medium"}
      clickable={p.clickable}
      disabled={p.disabled}
      onDelete={p.deletable ? () => {} : undefined}
      // alignSelf prevents column-stack flex containers from stretching the
      // chip to the full cross-axis width (chips should be content-width).
      sx={{ maxWidth: "100%", alignSelf: "flex-start" }}
    />
  ),
  DIVIDER: (p) => (
    <Divider
      orientation={p.orientation || "horizontal"}
      variant={p.variant || "fullWidth"}
      textAlign={p.textAlign || "center"}
      flexItem={p.flexItem}
      light={p.light}
      sx={
        p.orientation === "vertical"
          ? { height: 64, alignSelf: "center" }
          : { my: 1.5 }
      }
    >
      {p.text || undefined}
    </Divider>
  ),
  TOOLTIP: (p) => (
    <Tooltip
      title={p.title || "Tooltip text"}
      placement={p.placement || "top"}
      arrow={p.arrow}
      open={p.open || undefined}
    >
      <Chip variant="outlined" label={p.label || "Hover me"} />
    </Tooltip>
  ),

  // --------------- Feedback ---------------
  ALERT: (p) => (
    <Alert
      severity={p.severity || "info"}
      variant={p.variant || "standard"}
      color={p.color || undefined}
      onClose={p.closable ? () => {} : undefined}
    >
      {p.title && <AlertTitle>{p.title}</AlertTitle>}
      {p.message || "This is an alert."}
    </Alert>
  ),
  LINEAR_PROGRESS: (p) => (
    <Box sx={{ minWidth: 220 }}>
      {p.label && (
        <Typography variant="caption" color="text.secondary">
          {p.label}
        </Typography>
      )}
      <LinearProgress
        variant={p.variant || "indeterminate"}
        value={toNum(p.value, 0)}
        valueBuffer={toNum(p.valueBuffer, 0)}
        color={p.color || "primary"}
      />
    </Box>
  ),
  CIRCULAR_PROGRESS: (p) => (
    <CircularProgress
      variant={p.variant || "indeterminate"}
      value={toNum(p.value, 0)}
      color={p.color || "primary"}
      size={toNum(p.size, 40)}
      thickness={toNum(p.thickness, 3.6)}
      disableShrink={p.disableShrink}
    />
  ),
  SKELETON: (p) => (
    <Skeleton
      variant={p.variant || "text"}
      animation={p.animation === "false" ? false : p.animation || "pulse"}
      width={asSize(p.width, p.variant === "circular" ? 40 : 210)}
      height={asSize(p.height, p.variant === "circular" ? 40 : undefined)}
    />
  ),

  // --------------- Navigation ---------------
  TABS: (p) => {
    const tabs = safeJson(p.tabs) || [];
    const initial = Math.min(
      toNum(p.defaultIndex, 0),
      Math.max(tabs.length - 1, 0)
    );
    return <TabsRuntime tabs={tabs} initial={initial} p={p} />;
  },
  STEPPER: (p) => {
    const steps = safeJson(p.steps) || [];
    const usable = steps.length
      ? steps
      : [{ label: "Step one" }, { label: "Step two" }, { label: "Step three" }];
    return (
      <Stepper
        activeStep={toNum(p.activeStep, 0)}
        orientation={p.orientation || "horizontal"}
        alternativeLabel={p.alternativeLabel}
        nonLinear={p.nonLinear}
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
  BREADCRUMBS: (p) => {
    const items = safeJson(p.items) || [
      { label: "Home", href: "#" },
      { label: "Current" },
    ];
    const sep =
      p.separatorIcon === "chevron" ? (
        <NavigateNextIcon fontSize="small" />
      ) : (
        p.separatorIcon || "/"
      );
    return (
      <Breadcrumbs separator={sep} maxItems={toNum(p.maxItems, 8)}>
        {items.map((it, i) => {
          const last = i === items.length - 1;
          if (last || !it.href) {
            return (
              <Typography color="text.primary" key={i}>
                {it.label}
              </Typography>
            );
          }
          return (
            <Link key={i} underline="hover" color="inherit" href={it.href}>
              {it.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    );
  },
  PAGINATION: (p) => (
    <Pagination
      count={toNum(p.count, 10)}
      defaultPage={toNum(p.defaultPage, 1)}
      siblingCount={toNum(p.siblingCount, 1)}
      boundaryCount={toNum(p.boundaryCount, 1)}
      color={p.color || "primary"}
      variant={p.variant || "text"}
      shape={p.shape || "circular"}
      size={p.size || "medium"}
      showFirstButton={p.showFirstButton}
      showLastButton={p.showLastButton}
      disabled={p.disabled}
    />
  ),
};

/**
 * Buttons in the preview that sit inside an open Dialog close that dialog
 * on click — so the user can demo "Cancel" / "Submit" flows without each
 * Button having to know about dialogs. Buttons outside a dialog have no
 * onClick (preview is non-functional for hrefs etc).
 */
function PreviewButton({ p }) {
  const closeDialog = React.useContext(DialogCloseContext);
  return (
    <Button
      variant={p.variant || "contained"}
      color={p.color || "primary"}
      size={p.size || "medium"}
      fullWidth={p.fullWidth}
      disabled={p.disabled}
      disableElevation={p.disableElevation}
      disableRipple={p.disableRipple}
      href={p.href}
      target={p.target}
      onClick={closeDialog || undefined}
    >
      {p.label || "Button"}
    </Button>
  );
}

/**
 * Real Dialog in the preview: a trigger button that opens an MUI Dialog
 * containing the user-composed children. `disablePortal` keeps the dialog
 * DOM inside the iframe so the backdrop covers the preview viewport
 * instead of escaping to the host document.
 */
function DialogPreview({ p, kids }) {
  const [open, setOpen] = React.useState(Boolean(p.openByDefault));
  const close = React.useCallback(() => setOpen(false), []);
  const maxWidthValue = p.maxWidth === "false" ? false : p.maxWidth || "sm";

  return (
    <>
      <Button
        variant={p.triggerVariant || "contained"}
        color={p.triggerColor || "primary"}
        size={p.triggerSize || "medium"}
        startIcon={<OpenInNewOutlinedIcon />}
        onClick={() => setOpen(true)}
        sx={{ alignSelf: "flex-start" }}
      >
        {p.triggerLabel || p.dialogTitle || "Open dialog"}
      </Button>

      <Dialog
        open={open}
        onClose={close}
        maxWidth={maxWidthValue}
        fullWidth={Boolean(p.fullWidth)}
        fullScreen={Boolean(p.fullScreen)}
        scroll={p.scroll || "paper"}
        disableEscapeKeyDown={Boolean(p.disableEscapeKeyDown)}
        // Keep the modal DOM inside the iframe so its overlay covers the
        // preview viewport (not the host document).
        disablePortal
        keepMounted={false}
        transitionDuration={
          p.transitionDuration !== undefined
            ? toNum(p.transitionDuration, 225)
            : undefined
        }
        PaperProps={{
          elevation: p.elevation !== undefined ? toNum(p.elevation, 8) : 8,
          sx: { borderRadius: 2 },
        }}
      >
        {(p.dialogTitle || p.dialogSubheader) && (
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 1,
              pr: 1,
              p:
                p.padding !== undefined
                  ? toNum(p.padding, undefined)
                  : undefined,
            }}
          >
            <Box>
              <Typography
                component="span"
                variant="h6"
                sx={{ fontWeight: 700, display: "block", lineHeight: 1.3 }}
              >
                {p.dialogTitle}
              </Typography>
              {p.dialogSubheader && (
                <Typography variant="body2" color="text.secondary">
                  {p.dialogSubheader}
                </Typography>
              )}
            </Box>
            <IconButton
              size="small"
              onClick={close}
              aria-label="Close"
              sx={{ mt: -0.5 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </DialogTitle>
        )}
        <DialogCloseContext.Provider value={close}>
          {kids}
        </DialogCloseContext.Provider>
      </Dialog>
    </>
  );
}

function TabsRuntime({ tabs, initial, p }) {
  const [value, setValue] = React.useState(initial);
  React.useEffect(() => setValue(initial), [initial]);
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", minWidth: 240 }}>
      <Tabs
        value={value}
        onChange={(_, v) => setValue(v)}
        orientation={p.orientation || "horizontal"}
        variant={p.variant || "standard"}
        indicatorColor={p.indicatorColor || "primary"}
        textColor={p.textColor || "primary"}
        centered={p.centered}
      >
        {(tabs.length ? tabs : [{ label: "Tab 1" }, { label: "Tab 2" }]).map(
          (t, i) => (
            <Tab key={i} label={t.label} disabled={t.disabled} />
          )
        )}
      </Tabs>
    </Box>
  );
}

function PreviewNode({ node }) {
  const tag = node?.info?.tag;
  const renderer = RENDERERS[tag];
  if (!renderer) return null;
  const kids = renderChildren(node.child);
  return renderer(node.props || {}, kids);
}

export default function RenderPreview({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Typography color="text.secondary">
        Nothing to preview yet — drop components on the canvas first.
      </Typography>
    );
  }
  return (
    // alignItems="center" centers bounded children (cards with maxWidth) on
    // the cross-axis. Children that want to span full width (Grid containers,
    // alerts) already set width:100% in their own renderer / MUI defaults,
    // so they're unaffected.
    <Stack spacing={2} alignItems="center">
      {data.map((n) => (
        <PreviewNode key={n.id} node={n} />
      ))}
    </Stack>
  );
}
