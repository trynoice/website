import { extendTheme } from "@chakra-ui/react";

const systemSansSerifFonts = `-apple-system, BlinkMacSystemFont, "Segoe UI",
  "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
  "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
  "Segoe UI Symbol"`;

const systemMonoFonts = `"SF Mono", "Menlo", "Monaco", "Cascadia Mono",
  "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace",
  "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", "Consolas",
  "Liberation Mono", "Courier New", monospace`;

export default extendTheme({
  colors: {
    primary: {
      50: "#9befd0",
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
  fonts: {
    body: systemSansSerifFonts,
    heading: systemSansSerifFonts,
    mono: systemMonoFonts,
  },
});
