import * as React from "react";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";

/**
 * Renderers for property-panel editors. Each takes:
 *   - field:   the schema entry { name, label, type, options?, helper? }
 *   - value:   the current value for this prop (may be undefined)
 *   - onChange: (newValue) => void
 *
 * Components consume these via <PropertyPanel schema={...} formData={...}
 * onChange={...} /> so adding a new editor type means adding a single branch
 * here, not touching every component file.
 */

function TextEditor({ field, value, onChange }) {
  return (
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      label={field.label}
      placeholder={field.placeholder || ""}
      helperText={field.helper}
      value={value ?? ""}
      multiline={field.multiline}
      rows={field.rows}
      type={field.inputType || "text"}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function NumberEditor({ field, value, onChange }) {
  return (
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      label={field.label}
      helperText={field.helper}
      type="number"
      inputProps={{ min: field.min, max: field.max, step: field.step }}
      value={value ?? ""}
      onChange={(e) => {
        const raw = e.target.value;
        onChange(raw === "" ? undefined : Number(raw));
      }}
    />
  );
}

function BooleanEditor({ field, value, onChange }) {
  return (
    <FormControlLabel
      control={
        <Switch
          size="small"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
        />
      }
      label={field.label}
    />
  );
}

function SelectEditor({ field, value, onChange }) {
  return (
    <FormControl size="small" fullWidth>
      <InputLabel>{field.label}</InputLabel>
      <Select
        label={field.label}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || undefined)}
      >
        {field.allowClear !== false && (
          <MenuItem value="">
            <em>—</em>
          </MenuItem>
        )}
        {(field.options || []).map((opt) => {
          const optValue = typeof opt === "string" ? opt : opt.value;
          const optLabel = typeof opt === "string" ? opt : opt.label;
          return (
            <MenuItem key={optValue} value={optValue}>
              {optLabel}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

function JsonEditor({ field, value, onChange }) {
  // Stored as a JSON string in form state so users can free-type, but parsed
  // before being applied to props (PropertyPanel handles that on save).
  const [text, setText] = React.useState(
    typeof value === "string" ? value : JSON.stringify(value ?? "", null, 2)
  );
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!text) {
      setError("");
      onChange(undefined);
      return;
    }
    try {
      onChange(JSON.parse(text));
      setError("");
    } catch (err) {
      setError(err.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      multiline
      rows={field.rows || 4}
      label={field.label}
      helperText={error || field.helper}
      error={Boolean(error)}
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}

const EDITORS = {
  text: TextEditor,
  number: NumberEditor,
  boolean: BooleanEditor,
  select: SelectEditor,
  json: JsonEditor,
};

export function renderPropEditor(field, value, onChange) {
  const Editor = EDITORS[field.type] || TextEditor;
  return <Editor field={field} value={value} onChange={onChange} />;
}
