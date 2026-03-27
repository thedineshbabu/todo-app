// ── Colors ───────────────────────────────────────────────────────────────────

export const colors = {
  // Primary / accent (indigo)
  primary: "#6366f1",
  primaryHover: "#4f46e5",
  primaryFocus: "rgba(99, 102, 241, 0.18)",
  primaryGlow: "rgba(99, 102, 241, 0.45)",
  primarySubtle: "rgba(99, 102, 241, 0.10)",

  // Success / add action (green)
  success: "#22c55e",
  successDark: "#16a34a",
  successDeep: "#15803d",
  successGlow: "rgba(34, 197, 94, 0.35)",
  successGlowStrong: "rgba(34, 197, 94, 0.60)",

  // Danger / destructive (red)
  danger: "#ef4444",
  dangerLight: "#f87171",
  dangerDark: "#dc2626",
  dangerDeep: "#b91c1c",
  dangerGlow: "rgba(239, 68, 68, 0.35)",
  dangerGlowStrong: "rgba(239, 68, 68, 0.60)",
  dangerSubtle: "#fee2e2",
  dangerBorder: "#fca5a5",

  // Surface / background
  background: "#f5f5f5",
  surface: "#ffffff",
  surfaceLow: "#fafafa",
  surfaceCompleted: "#f0fdf4",
  bodyGradientStart: "#eef2ff",
  bodyGradientMid: "#f5f5f5",
  bodyGradientEnd: "#f0fff4",

  // Text
  textPrimary: "#222222",
  textSecondary: "#6b7280",
  textMuted: "#888888",
  textDisabled: "#aaaaaa",
  textTimestamp: "#999999",
  textOnAccent: "#ffffff",
  textCompleted: "#aaaaaa",

  // Borders
  border: "#dddddd",
  borderLight: "#eeeeee",
  borderSubtle: "#e0e0e0",
  borderCompleted: "#bbf7d0",

  // Clock
  clockAccent: "#6366f1",
} as const;

// ── Spacing ──────────────────────────────────────────────────────────────────

export const spacing = {
  "0": "0px",
  "1": "4px",
  "2": "8px",
  "3": "10px",
  "4": "12px",
  "5": "16px",
  "6": "20px",
  "7": "24px",
  "8": "32px",
  "9": "48px",
} as const;

// ── Border Radius ─────────────────────────────────────────────────────────────

export const borderRadius = {
  sm: "6px",
  md: "8px",
  lg: "12px",
  full: "9999px",
} as const;

// ── Typography ────────────────────────────────────────────────────────────────

export const fontSize = {
  xs: "0.78rem",
  sm: "0.80rem",
  base: "0.85rem",
  body: "0.95rem",
  md: "0.95rem",
  lg: "1.6rem",
  xl: "1.8rem",
} as const;

export const fontWeight = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const letterSpacing = {
  tight: "-0.02em",
  normal: "0em",
  wide: "0.05em",
} as const;

// ── Shadows ───────────────────────────────────────────────────────────────────

export const shadows = {
  // Container / card elevation
  card: "0 4px 24px rgba(99, 102, 241, 0.10), 0 1px 4px rgba(0, 0, 0, 0.06)",

  // List item hover
  listHover: "0 2px 10px rgba(99, 102, 241, 0.10)",

  // Button resting / hover
  btnSuccessRest: "0 2px 8px rgba(34, 197, 94, 0.35)",
  btnSuccessHover: "0 4px 14px rgba(34, 197, 94, 0.60)",
  btnDangerRest: "0 2px 8px rgba(239, 68, 68, 0.35)",
  btnDangerHover: "0 4px 14px rgba(239, 68, 68, 0.60)",

  // Delete button hover
  btnDeleteHover: "0 2px 8px rgba(239, 68, 68, 0.20)",

  // Input focus ring (used as boxShadow)
  inputFocus: "0 0 0 3px rgba(99, 102, 241, 0.18)",
} as const;

// ── Gradients ─────────────────────────────────────────────────────────────────

export const gradients = {
  title: "linear-gradient(90deg, #111 0%, #6366f1 40%, #22c55e 70%, #111 100%)",
  body: "linear-gradient(135deg, #eef2ff 0%, #f5f5f5 50%, #f0fff4 100%)",
  btnSuccessRest: "linear-gradient(135deg, #22c55e, #16a34a)",
  btnSuccessHover: "linear-gradient(135deg, #15803d, #16a34a)",
  btnDangerRest: "linear-gradient(135deg, #ef4444, #f87171)",
  btnDangerHover: "linear-gradient(135deg, #b91c1c, #dc2626)",
} as const;

// ── Transitions ───────────────────────────────────────────────────────────────

export const transitions = {
  fast: "all 0.15s ease",
  base: "all 0.20s ease",
  enter: "cubic-bezier(0.2, 0, 0, 1)",
} as const;

// ── Composed style objects (React CSSProperties) ──────────────────────────────

export const styleTokens = {
  // Base button shape (shared between Add and Clear)
  buttonBase: {
    color: colors.textOnAccent,
    border: "none",
    borderRadius: borderRadius.md,
    padding: `${spacing["2"]} ${spacing["6"]}`,
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.body,
    cursor: "pointer",
    transition: transitions.base,
  },

  // Delete button resting state
  deleteButtonRest: {
    background: "none",
    border: `1px solid ${colors.borderSubtle}`,
    borderRadius: borderRadius.sm,
    padding: `${spacing["1"]} ${spacing["3"]}`,
    fontSize: fontSize.sm,
    color: colors.textMuted,
    cursor: "pointer",
    transition: transitions.base,
  },

  // Delete button hover state
  deleteButtonHover: {
    background: colors.dangerSubtle,
    borderColor: colors.dangerBorder,
    color: colors.dangerDark,
    transform: "scale(1.05)",
    boxShadow: shadows.btnDeleteHover,
  },

  // Timestamp label
  timestamp: {
    fontSize: fontSize.xs,
    color: colors.textTimestamp,
    whiteSpace: "nowrap",
  },

  // Remaining count
  remaining: {
    marginTop: spacing["5"],
    fontSize: fontSize.base,
    color: colors.textMuted,
  },
} as const;
