import { extendTheme } from "@chakra-ui/react";
import "@fontsource/poppins/latin-400-italic.css";
import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-500-italic.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600-italic.css";
import "@fontsource/poppins/latin-600.css";
import "@fontsource/poppins/latin-700-italic.css";
import "@fontsource/poppins/latin-700.css";
import "@fontsource/urbanist/latin-500-italic.css";
import "@fontsource/urbanist/latin-500.css";

export default extendTheme({
  colors: {
    black: "#1d1d26",
    white: "#fefefe",
    indigo: {
      50: "#e8eaf6",
      100: "#c5cae9",
      200: "#9fa8da",
      300: "#7986cb",
      400: "#5c6bc0",
      500: "#3f51b5",
      600: "#3949ab",
      700: "#303f9f",
      800: "#283593",
      900: "#1a237e",
    },
    primary: {
      50: "#fbfdf8",
      100: "#6fe8bb",
      200: "#59e4b1",
      300: "#43e1a7",
      400: "#2ddd9c",
      500: "#1eb980",
      600: "#178d62",
      700: "#137752",
      800: "#106143",
      900: "#093525",
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: "medium",
      },
    },
    Button: {
      baseStyle: {
        fontWeight: "medium",
      },
    },
  },
  fonts: {
    body: `"Poppins", sans-serif`,
    heading: `"Urbanist", sans-serif`,
    mono: `"SF Mono", "Menlo", "Monaco", "Cascadia Mono",
      "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace",
      "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", "Consolas",
      "Liberation Mono", "Courier New", monospace`,
  },
  styles: {
    global: {
      body: {
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },
    },
  },
  semanticTokens: {
    sizes: {
      maxContentWidth: "7xl",
    },
    space: {
      contentPaddingXDefault: 6,
      contentPaddingXMd: 8,
      contentPaddingXLg: 10,
      contentPaddingXXl: 12,
    },
  },
});
