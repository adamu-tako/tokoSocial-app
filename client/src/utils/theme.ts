import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    primary: "Poppins",
  },
  components: {
    // Steps,
  },
  colors: {
    primary: "#4299E1",
    // primary: "#FEB032",
    textMuted: "#9EA8B7",
    textBold: "#34373A",
    secondary: "#F3F5F8",
    success: "#04CF3C",
    greenBg: "#e8f6ee",
    danger: "red",
    white: "#fff",
    blu: "#130F26",
    lightBlue: "#1976D2",
    secondaryBlue: "#8196B3",
    overlayBlue: "#8196b385",
  },
});

export default theme;
