import { extendTheme } from "@chakra-ui/react";

// Custom theme definition with jewel tones
export const applicationTheme = extendTheme({
  colors: {
    // Sapphire Glow from Jewel Box
    primary: {
      "50": "#b0cdf9",
      "100": "#8eb7f6",
      "200": "#6099f2",
      "300": "#327cee",
      "400": "#1261dd",
      "500": "#0f52ba",
      "600": "#0d48a4",
      "700": "#0b3b86",
      "800": "#082e68",
      "900": "#06214a",
    },
    // Moss Bed from Zen Garden
    secondary: {
      "50": "#d9dcd3",
      "100": "#c8cdc0",
      "200": "#b2b9a7",
      "300": "#9ca58e",
      "400": "#869175",
      "500": "#757f65",
      "600": "#677059",
      "700": "#545b49",
      "800": "#424739",
      "900": "#2f3328",
    },
    // Ruby Sparkle from Jewel Box
    accent: {
      "50": "#fab9d1",
      "100": "#f79bbe",
      "200": "#f473a4",
      "300": "#f14b8a",
      "400": "#ee2370",
      "500": "#e0115f",
      "600": "#c50f54",
      "700": "#a10c44",
      "800": "#7d0a35",
      "900": "#5a0726",
    },
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
  styles: {},
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  // Tried setting these globally and it didn't work
  //
  components: {
    Button: {
      defaultProps: {
        colorScheme: "primary",
      },
    },
    IconButton: {
      defaultProps: {
        colorScheme: "gray",
        variant: "ghost",
      },
    },
    Checkbox: {
      defaultProps: {
        colorScheme: "primary",
      },
    },
    Radio: {
      defaultProps: {
        colorScheme: "primary",
      },
    },
    Switch: {
      defaultProps: {
        colorScheme: "primary",
      },
    },
    Tabs: {
      defaultProps: {
        colorScheme: "secondary",
      },
    },
  },
});

export default applicationTheme;
