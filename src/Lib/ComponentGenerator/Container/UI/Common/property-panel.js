import * as React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import bombieContext from "src/Lib/ComponentGenerator/bombie-context";
import PropertyController from "./property-controller";
import { renderPropEditor } from "./prop-editors";

/**
 * Render a properties dialog populated from a schema.
 *
 * Schema shape:
 *   [
 *     { name: "variant", label: "Variant", type: "select",
 *       options: ["text", "outlined", "contained"], group: "Appearance" },
 *     { name: "fullWidth", label: "Full width", type: "boolean", group: "Layout" },
 *     ...
 *   ]
 *
 * Fields with the same `group` render under a shared heading.
 *
 * Perf note: the editor JSX is heavy (10-20 MUI form controls per
 * component, multiplied by every canvas component). We only construct it
 * when this component's dialog is actually open — closed canvas components
 * pay nothing but a context read.
 */
export default function PropertyPanel({
  currentChild,
  formData,
  setFormData,
  schema,
}) {
  const [, , effect] = React.useContext(bombieContext);
  const isOpen = effect?.open_UIController_Dialog === currentChild.id;

  const groups = React.useMemo(() => {
    if (!isOpen) return null;
    const ordered = [];
    const byName = new Map();
    schema.forEach((field) => {
      const g = field.group || "General";
      if (!byName.has(g)) {
        byName.set(g, []);
        ordered.push(g);
      }
      byName.get(g).push(field);
    });
    return ordered.map((name) => ({ name, fields: byName.get(name) }));
  }, [schema, isOpen]);

  const updateField = React.useCallback(
    (name, value) => {
      setFormData((prev) => {
        const next = { ...prev };
        if (value === undefined || value === "") {
          delete next[name];
        } else {
          next[name] = value;
        }
        return next;
      });
    },
    [setFormData]
  );

  // PropertyController always mounts (so it can flip to open when the user
  // clicks the edit icon) but we skip building the editor children when
  // closed — this is the dominant cost on large canvases.
  return (
    <PropertyController currentChild={currentChild} formData={formData}>
      {isOpen && groups && (
        <Stack spacing={3} sx={{ minWidth: 360 }}>
          {groups.map((group, idx) => (
            <Box key={group.name}>
              {groups.length > 1 && (
                <>
                  {idx > 0 && <Divider sx={{ mb: 2 }} />}
                  <Typography
                    variant="overline"
                    color="text.secondary"
                    sx={{ fontWeight: 700, letterSpacing: "0.1em" }}
                  >
                    {group.name}
                  </Typography>
                </>
              )}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, minmax(0, 1fr))",
                  },
                  gap: 2,
                  mt: 1,
                }}
              >
                {group.fields.map((field) => (
                  <Box
                    key={field.name}
                    sx={{
                      gridColumn:
                        field.span === "full" ? { md: "span 2" } : undefined,
                    }}
                  >
                    {renderPropEditor(field, formData[field.name], (v) =>
                      updateField(field.name, v)
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Stack>
      )}
    </PropertyController>
  );
}
