const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      blue: {
        50: "#e8f4f8",
        100: "#d1e9f1",
        200: "#a3cee4",
        300: "#75b2d8",
        400: "#4897cb",
        500: "#1a7bbf",
        600: "#1561a0",
        700: "#104780",
        800: "#0b2d60",
        900: "#051340",
      },
      purple: {
        50: "#f3eff9",
        100: "#e7dff3",
        200: "#c2b6db",
        300: "#9d8dbf",
        400: "#7856a3",
        500: "#532e87",
        600: "#42256e",
        700: "#311c54",
        800: "#21133a",
        900: "#10091f",
      },
      gold: {
        50: "#fdf8e8",
        100: "#faf1d1",
        200: "#f4dd9e",
        300: "#eec96b",
        400: "#e7b438",
        500: "#e1a005",
        600: "#b78504",
        700: "#876003",
        800: "#584002",
        900: "#2a2001",
      },
      gray: {
        50: "#f6f6f9",
        100: "#e1e1e6",
        200: "#c9c9d1",
        300: "#b2b2bd",
        400: "#9c9ca9",
        500: "#85859a",
        600: "#6d6d85",
        700: "#565670",
        800: "#3e3e5b",
        900: "#272742",
      },
    },
    screens: {
      sm: "600px",
      md: "900px",
      lg: "1200px",
      xl: "1500px",
      "2xl": "1800px",
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    fontFamily: {
      sans: ["Nunito", ...defaultTheme.fontFamily.sans],
      serif: ["Bodoni", ...defaultTheme.fontFamily.serif],
      lato: ["Lato", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      spacing: {
        128: "32rem",
      },
      borderWidth: {
        3: "3px",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.800"),
            a: {
              color: theme("colors.blue.500"),
              "&:hover": {
                color: theme("colors.blue.600"),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.200"),
            a: {
              color: theme("colors.gray.400"),
              "&:hover": {
                color: theme("colors.gray.300"),
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ["dark"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
