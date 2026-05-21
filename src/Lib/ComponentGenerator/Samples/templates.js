import { v4 as uuid } from "uuid";
import elements from "../Data/elements";

// Catalog lookup by tag — used to attach the right `info` block to each
// instantiated node so drop-zone behaviour, type-matching and the palette
// stay consistent with hand-dragged trees.
const catalogByTag = Object.fromEntries(elements.map((e) => [e.tag, e]));

/**
 * Shorthand for declaring template trees. `node(tag, props, child[])`.
 * Templates are plain data — ids are generated on instantiate so loading a
 * sample twice gives independent trees.
 */
export function node(tag, props = {}, children = []) {
  return { tag, props, children };
}

/**
 * Convert a template (plain tree of {tag, props, children}) into a
 * builder-ready tree of {id, info, props, child[]}. Unknown tags are
 * dropped so a renamed catalog can't corrupt the canvas.
 */
export function instantiate(template) {
  const info = catalogByTag[template.tag];
  if (!info) return null;
  return {
    id: uuid(),
    info,
    props: template.props || {},
    child: (template.children || []).map(instantiate).filter(Boolean),
  };
}

// ============================== SAMPLE 1 ==============================
// Sign-in card — centered, bounded, branded header, form, social action.

const loginTemplate = node("CARD", { variant: "elevation", maxWidth: 460 }, [
  node("CARDCONTENT", { compact: false }, [
    node("STACK", { spacing: 3, alignItems: "center" }, [
      node("AVATAR", {
        children: "B",
        size: 56,
        bgcolor: "primary.main",
        variant: "rounded",
      }),
      node("STACK", { spacing: 0.5, alignItems: "center" }, [
        node("TYPOGRAPHY", {
          text: "Welcome back",
          variant: "h5",
          fontWeight: "700",
          align: "center",
        }),
        node("TYPOGRAPHY", {
          text: "Sign in to continue to your dashboard",
          variant: "body2",
          color: "text.secondary",
          align: "center",
        }),
      ]),
    ]),
    node("STACK", { spacing: 2.5, marginTop: 3 }, [
      node("TEXTFIELD", {
        label: "Email address",
        type: "email",
        required: true,
        fullWidth: true,
        autoComplete: "email",
        placeholder: "you@example.com",
        variant: "outlined",
      }),
      node("TEXTFIELD", {
        label: "Password",
        type: "password",
        required: true,
        fullWidth: true,
        autoComplete: "current-password",
        variant: "outlined",
        helperText: "At least 8 characters",
      }),
      node(
        "STACK",
        {
          direction: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
        [
          node("SWITCH", {
            label: "Remember me",
            defaultChecked: true,
            color: "primary",
            size: "small",
          }),
          node("TYPOGRAPHY", {
            text: "Forgot password?",
            variant: "body2",
            color: "primary",
            fontWeight: "600",
          }),
        ]
      ),
      node("BUTTON", {
        label: "Sign in",
        variant: "contained",
        color: "primary",
        fullWidth: true,
        size: "large",
      }),
      node("DIVIDER", { text: "or", textAlign: "center" }),
      node("BUTTON", {
        label: "Continue with Google",
        variant: "outlined",
        color: "primary",
        fullWidth: true,
        size: "large",
      }),
      node("TYPOGRAPHY", {
        text: "By signing in you agree to our Terms and Privacy Policy.",
        variant: "caption",
        color: "text.secondary",
        align: "center",
      }),
    ]),
  ]),
]);

// ============================== SAMPLE 2 ==============================
// Stats dashboard — header + three KPI cards + alert + recent-activity row.
// Each stat card uses a vertical layout to avoid trend-chip overflow on
// narrower viewports.

function statCard({
  title,
  period,
  avatarChar,
  avatarBg,
  value,
  trend,
  trendColor,
  progress,
  progressColor,
}) {
  return node("GRIDITEM", { xs: 12, sm: 6, md: 4 }, [
    node("CARD", { variant: "outlined" }, [
      node("CARDCONTENT", {}, [
        node("STACK", { spacing: 2 }, [
          node(
            "STACK",
            {
              direction: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
            [
              node("STACK", { spacing: 0 }, [
                node("TYPOGRAPHY", {
                  text: title,
                  variant: "subtitle2",
                  fontWeight: "600",
                  color: "text.secondary",
                }),
                node("TYPOGRAPHY", {
                  text: period,
                  variant: "caption",
                  color: "text.secondary",
                }),
              ]),
              node("AVATAR", {
                children: avatarChar,
                size: 40,
                bgcolor: avatarBg,
                variant: "rounded",
              }),
            ]
          ),
          node(
            "STACK",
            { direction: "row", spacing: 1.5, alignItems: "baseline" },
            [
              node("TYPOGRAPHY", {
                text: value,
                variant: "h4",
                fontWeight: "700",
              }),
              node("CHIP", {
                label: trend,
                color: trendColor,
                size: "small",
                variant: "filled",
              }),
            ]
          ),
          node("LINEAR_PROGRESS", {
            variant: "determinate",
            value: progress,
            color: progressColor,
          }),
        ]),
      ]),
    ]),
  ]);
}

const dashboardTemplate = node("GRIDCONTAINER", { spacing: 3 }, [
  node("GRIDITEM", { xs: 12 }, [
    node(
      "STACK",
      {
        direction: "row",
        justifyContent: "space-between",
        alignItems: "center",
        spacing: 2,
      },
      [
        node("STACK", { spacing: 0 }, [
          node("TYPOGRAPHY", {
            text: "Overview",
            variant: "h4",
            fontWeight: "700",
          }),
          node("TYPOGRAPHY", {
            text: "Track your key business metrics at a glance",
            variant: "body2",
            color: "text.secondary",
          }),
        ]),
        node("CHIP", {
          label: "Updated 5 min ago",
          color: "default",
          size: "small",
          variant: "outlined",
        }),
      ]
    ),
  ]),
  statCard({
    title: "Revenue",
    period: "Last 30 days",
    avatarChar: "$",
    avatarBg: "success.main",
    value: "$24,580",
    trend: "+12.5%",
    trendColor: "success",
    progress: 75,
    progressColor: "success",
  }),
  statCard({
    title: "Active users",
    period: "Right now",
    avatarChar: "U",
    avatarBg: "primary.main",
    value: "1,289",
    trend: "+8.2%",
    trendColor: "primary",
    progress: 62,
    progressColor: "primary",
  }),
  statCard({
    title: "Conversion",
    period: "Checkout funnel",
    avatarChar: "%",
    avatarBg: "warning.main",
    value: "3.4%",
    trend: "-2.1%",
    trendColor: "error",
    progress: 34,
    progressColor: "warning",
  }),
  node("GRIDITEM", { xs: 12 }, [
    node("ALERT", {
      severity: "info",
      variant: "outlined",
      title: "Pro tip",
      message:
        "Click any card to drill into its full report. You can also customise these widgets from Settings → Dashboard.",
    }),
  ]),
  node("GRIDITEM", { xs: 12 }, [
    node(
      "STACK",
      {
        direction: "row",
        justifyContent: "space-between",
        alignItems: "center",
        spacing: 2,
      },
      [
        node("TYPOGRAPHY", {
          text: "Recent activity",
          variant: "subtitle1",
          fontWeight: "700",
        }),
        node("PAGINATION", {
          count: 10,
          defaultPage: 1,
          color: "primary",
          shape: "rounded",
          size: "small",
        }),
      ]
    ),
  ]),
]);

// ============================== SAMPLE 3 ==============================
// Settings panel — centered, segmented sections, profile + notifications.

const settingsTemplate = node("CARD", { variant: "outlined", maxWidth: 720 }, [
  node("CARDHEADER", {
    title: "Account settings",
    subheader: "Manage how Bombie behaves for your account",
  }),
  node("CARDCONTENT", {}, [
    node("STACK", { spacing: 3 }, [
      node("BREADCRUMBS", {
        items: [
          { label: "Home", href: "#" },
          { label: "Settings", href: "#" },
          { label: "Account" },
        ],
        separatorIcon: "chevron",
      }),

      node("DIVIDER", { text: "Notifications" }),
      node("STACK", { spacing: 1.25 }, [
        node("SWITCH", {
          label: "Email me about activity on my projects",
          defaultChecked: true,
          color: "primary",
        }),
        node("SWITCH", {
          label: "Send me a weekly summary",
          defaultChecked: true,
          color: "primary",
        }),
        node("SWITCH", {
          label: "Notify me about product updates",
          color: "primary",
        }),
      ]),

      node("DIVIDER", { text: "Appearance" }),
      node("RADIOGROUP", {
        label: "Color mode",
        row: true,
        defaultValue: "system",
        options: [
          { label: "Light", value: "light" },
          { label: "Dark", value: "dark" },
          { label: "System", value: "system" },
        ],
      }),

      node("DIVIDER", { text: "Profile" }),
      node("STACK", { spacing: 2 }, [
        node("TEXTFIELD", {
          label: "Display name",
          defaultValue: "Amith Moorkoth",
          fullWidth: true,
          variant: "outlined",
        }),
        node("TEXTFIELD", {
          label: "Bio",
          placeholder: "A short bio shown on your public profile",
          multiline: true,
          rows: 3,
          fullWidth: true,
          variant: "outlined",
        }),
      ]),

      node("ALERT", {
        severity: "warning",
        variant: "standard",
        message:
          "Some changes (display name, bio) are visible to people you share projects with.",
      }),
    ]),
  ]),
  node("CARDACTIONS", {}, [
    node(
      "STACK",
      {
        direction: "row",
        spacing: 1.5,
        justifyContent: "flex-end",
      },
      [
        node("BUTTON", {
          label: "Reset",
          variant: "text",
          color: "secondary",
        }),
        node("BUTTON", {
          label: "Save changes",
          variant: "contained",
          color: "primary",
        }),
      ]
    ),
  ]),
]);

// ============================== SAMPLE 4 ==============================
// FAQ page + contact-support Dialog — shows Accordion and the Dialog
// family in one tree. The two roots stack vertically in the preview.

const faqCardTemplate = node("CARD", { variant: "outlined", maxWidth: 720 }, [
  node("CARDHEADER", {
    title: "Frequently asked questions",
    subheader: "Find answers below, or reach out to support",
    avatarText: "?",
    avatarBg: "primary.main",
    avatarVariant: "rounded",
  }),
  node("CARDCONTENT", { padding: 1 }, [
    node("STACK", { spacing: 1 }, [
      node(
        "ACCORDION",
        {
          title: "How do I get started with Bombie?",
          defaultExpanded: true,
          variant: "outlined",
          disableGutters: true,
        },
        [
          node("STACK", { spacing: 1.5 }, [
            node("TYPOGRAPHY", {
              text: "Click the Samples button at the top of the canvas to load a starter template, or drag any component from the right panel and drop it onto the canvas. Every dropped component is editable from the wrench icon.",
              variant: "body2",
              color: "text.secondary",
            }),
            node("CHIP", {
              label: "Beginner friendly",
              color: "success",
              size: "small",
              variant: "outlined",
            }),
          ]),
        ]
      ),
      node(
        "ACCORDION",
        {
          title: "Can I export my designs as React code?",
          variant: "outlined",
          disableGutters: true,
        },
        [
          node("STACK", { spacing: 1.5 }, [
            node("TYPOGRAPHY", {
              text: "Yes. Click View JSON to inspect the component tree, then download it via Download JSON. Pair it with our React renderer to mount the same tree in your own app.",
              variant: "body2",
              color: "text.secondary",
            }),
            node("ALERT", {
              severity: "info",
              variant: "standard",
              message:
                "Code-export to a single React file is in beta — open an issue if you hit anything weird.",
            }),
          ]),
        ]
      ),
      node(
        "ACCORDION",
        {
          title: "Does Bombie support custom components?",
          variant: "outlined",
          disableGutters: true,
        },
        [
          node("STACK", { spacing: 1.5 }, [
            node("TYPOGRAPHY", {
              text: "Custom components are coming in v2.0. You'll register a renderer once and it shows up in the palette alongside the built-ins.",
              variant: "body2",
              color: "text.secondary",
            }),
            node("STACK", { spacing: 0.5 }, [
              node("TYPOGRAPHY", {
                text: "v2.0 progress",
                variant: "caption",
                color: "text.secondary",
              }),
              node("LINEAR_PROGRESS", {
                variant: "determinate",
                value: 65,
                color: "primary",
              }),
            ]),
          ]),
        ]
      ),
      node(
        "ACCORDION",
        {
          title: "How can I reach support?",
          variant: "outlined",
          disableGutters: true,
        },
        [
          node("STACK", { spacing: 1.5 }, [
            node("TYPOGRAPHY", {
              text: "We're available 24/7 via email and chat. Most replies arrive within two hours.",
              variant: "body2",
              color: "text.secondary",
            }),
            node("STACK", { direction: "row", spacing: 1 }, [
              node("BUTTON", {
                label: "Open support form",
                variant: "contained",
                color: "primary",
                size: "small",
              }),
              node("BUTTON", {
                label: "Email us",
                variant: "outlined",
                color: "primary",
                size: "small",
              }),
            ]),
          ]),
        ]
      ),
    ]),
  ]),
]);

const supportDialogTemplate = node(
  "DIALOG",
  {
    dialogTitle: "Contact support",
    dialogSubheader: "We typically reply within 2 hours",
    maxWidth: "sm",
    fullWidth: true,
    elevation: 8,
  },
  [
    node(
      "DIALOGCONTENT",
      {
        dialogContentText:
          "Tell us what's going on and we'll get back to you ASAP.",
      },
      [
        node("STACK", { spacing: 2 }, [
          node("TEXTFIELD", {
            label: "Your email",
            type: "email",
            required: true,
            fullWidth: true,
            variant: "outlined",
            placeholder: "you@example.com",
          }),
          node("TEXTFIELD", {
            label: "Subject",
            fullWidth: true,
            variant: "outlined",
          }),
          node("SELECT", {
            label: "Priority",
            fullWidth: true,
            defaultValue: "normal",
            options: [
              { label: "Low — just curious", value: "low" },
              { label: "Normal", value: "normal" },
              { label: "High — blocking my work", value: "high" },
              { label: "Urgent — production down", value: "urgent" },
            ],
          }),
          node("TEXTFIELD", {
            label: "Message",
            multiline: true,
            rows: 4,
            fullWidth: true,
            required: true,
            variant: "outlined",
            placeholder: "What happened? What did you expect?",
          }),
        ]),
      ]
    ),
    node(
      "DIALOGACTIONS",
      { topBorder: true, justifyContent: "flex-end", gap: 8 },
      [
        node("BUTTON", {
          label: "Cancel",
          variant: "text",
          color: "secondary",
        }),
        node("BUTTON", {
          label: "Send message",
          variant: "contained",
          color: "primary",
        }),
      ]
    ),
  ]
);

// Public sample list. Each sample is a thunk so `instantiate` runs at click
// time, generating fresh ids every load.
export const SAMPLES = [
  {
    id: "login",
    title: "Sign-in card",
    description:
      "Branded card with email/password, remember-me, primary action, and SSO fallback.",
    accent: "#6366F1",
    iconName: "LockOutlined",
    build: () => [instantiate(loginTemplate)],
  },
  {
    id: "dashboard",
    title: "Stats dashboard",
    description:
      "Header, three KPI cards with trend chips and progress bars, plus an alert and activity footer.",
    accent: "#10B981",
    iconName: "DashboardOutlined",
    build: () => [instantiate(dashboardTemplate)],
  },
  {
    id: "settings",
    title: "Settings panel",
    description:
      "Account settings card with breadcrumbs, notification switches, theme radios, and profile fields.",
    accent: "#F59E0B",
    iconName: "SettingsOutlined",
    build: () => [instantiate(settingsTemplate)],
  },
  {
    id: "faq",
    title: "FAQ & support",
    description:
      "Expandable Q&A accordion paired with a Contact-support dialog (TextFields, Select, action buttons).",
    accent: "#0EA5E9",
    iconName: "HelpOutlineOutlined",
    build: () => [
      instantiate(faqCardTemplate),
      instantiate(supportDialogTemplate),
    ],
  },
];
