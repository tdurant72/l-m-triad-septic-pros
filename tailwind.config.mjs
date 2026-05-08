export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      "colors": {
        "on-primary-fixed": "#0F172A",
        "on-primary-container": "#64748B",
        "on-tertiary-container": "#818486",
        "tertiary-container": "#191c1e",
        "on-secondary-fixed": "#00210b",
        "surface-container-high": "#dce9ff",
        "inverse-surface": "#213145",
        "inverse-primary": "#bec6e0",
        "surface-container": "#e5eeff",
        "on-tertiary": "#ffffff",
        "on-background": "#0b1c30",
        "outline": "#76777d",
        "secondary": "#1f6c3a",
        "surface-container-low": "#eff4ff",
        "on-surface-variant": "#45464d",
        "surface-tint": "#565e74",
        "secondary-fixed-dim": "#8bd79b",
        "surface-dim": "#cbdbf5",
        "tertiary": "#000000",
        "on-tertiary-fixed-variant": "#444749",
        "on-primary": "#ffffff",
        "on-error-container": "#93000a",
        "on-surface": "#0b1c30",
        "on-error": "#ffffff",
        "primary-fixed-dim": "#bec6e0",
        "surface-variant": "#d3e4fe",
        "background": "#F8FAFC",
        "outline-variant": "#c6c6cd",
        "error": "#ba1a1a",
        "on-tertiary-fixed": "#191c1e",
        "on-secondary-container": "#24703e",
        "secondary-container": "#a4f1b2",
        "secondary-fixed": "#a6f4b5",
        "error-container": "#ffdad6",
        "tertiary-fixed": "#e0e3e5",
        "on-secondary": "#ffffff",
        "primary-container": "#131b2e",
        "surface-container-highest": "#d3e4fe",
        "primary-fixed": "#dae2fd",
        "tertiary-fixed-dim": "#c4c7c9",
        "surface-container-lowest": "#ffffff",
        "primary": "#000000",
        "inverse-on-surface": "#eaf1ff",
        "on-primary-fixed-variant": "#3f465c",
        "on-secondary-fixed-variant": "#005226",
        "surface-bright": "#f8f9ff",
        "surface": "#F8FAFC"
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "9999px"
      },
      "spacing": {
        "md": "16px",
        "container-max": "1280px",
        "unit": "4px",
        "sm": "8px",
        "gutter": "24px",
        "xs": "4px",
        "xl": "48px",
        "lg": "24px"
      },
      "fontFamily": {
        "h3": ["Manrope", "sans-serif"],
        "body-md": ["Manrope", "sans-serif"],
        "h1": ["Manrope", "sans-serif"],
        "body-lg": ["Manrope", "sans-serif"],
        "label-caps": ["Work Sans", "sans-serif"],
        "h2": ["Manrope", "sans-serif"]
      },
      "fontSize": {
        "h3": ["20px", {"lineHeight": "1.4", "letterSpacing": "0", "fontWeight": "600"}],
        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "h1": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "label-caps": ["12px", {"lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "600"}],
        "h2": ["24px", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600"}]
      },
      "maxWidth": {
        "xs": "20rem",
        "sm": "24rem",
        "md": "28rem",
        "lg": "32rem",
        "xl": "36rem",
        "2xl": "42rem",
        "3xl": "48rem"
      }
    }
  }
};
