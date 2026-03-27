// Design tokens — Veridian Slate theme
// Single source of truth for all inline style values in App.tsx

export const colors = {
  primary: "#003331",
  primaryHover: "#004b49",
  onPrimary: "#ffffff",

  surface: "#f8faf9",
  surfaceContainer: "#eceeed",
  surfaceContainerLow: "#f2f4f3",
  surfaceContainerLowest: "#ffffff",

  onSurface: "#191c1c",
  onSurfaceVariant: "#3f4948",

  border: "#bfc8c7",
  outline: "#707978",

  danger: "#ba1a1a",
  dangerHover: "#93000a",
  dangerContainer: "#ffdad6",
  onDanger: "#ffffff",
} as const;

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  xxl: "32px",
  xxxl: "48px",
} as const;

export const radii = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
} as const;

export const shadows = {
  card: "0 4px 24px rgba(0,51,49,0.08), 0 1px 4px rgba(0,0,0,0.06)",
  button: "0 2px 8px rgba(0,51,49,0.25)",
  buttonHover: "0 4px 14px rgba(0,51,49,0.40)",
  dangerButton: "0 2px 8px rgba(186,26,26,0.25)",
  dangerButtonHover: "0 4px 14px rgba(186,26,26,0.40)",
  inputFocus: "0 0 0 3px rgba(0,75,73,0.18)",
} as const;

export const typography = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  sizeBase: "0.95rem",
  sizeSm: "0.85rem",
  sizeXs: "0.78rem",
  sizeLg: "1.6rem",
  weightNormal: 400,
  weightSemibold: 600,
  weightBold: 700,
} as const;
