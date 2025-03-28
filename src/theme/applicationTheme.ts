import { extendTheme } from "@chakra-ui/react";

// Custom theme definition with jewel tones
export const applicationTheme = extendTheme({
  colors: {
    background: {
      "50": "#f9f9f9",
      "100": "#f7f7f7",
      "200": "#f4f4f4",
      "300": "#f1f1f1",
      "400": "#ededed",
      "500": "#ebebeb",
      "600": "#c3c3c3",
      "700": "#8f8f8f",
      "800": "#5a5a5a",
      "900": "#252525",
    },
    secondary: {
      "50": "#fdcfaf",
      "100": "#fcb788",
      "200": "#fb9854",
      "300": "#fa7820",
      "400": "#e05d05",
      "500": "#b94d04",
      "600": "#a34404",
      "700": "#853703",
      "800": "#682b02",
      "900": "#4a1f02",
    },
    primary: {
      "50": "#d4dbe3",
      "100": "#c2cbd7",
      "200": "#aab7c8",
      "300": "#92a2b8",
      "400": "#798da8",
      "500": "#677e9c",
      "600": "#5a6f8a",
      "700": "#4a5b71",
      "800": "#394658",
      "900": "#29323f",
    },
    accent: {
      "50": "#fdcfb0",
      "100": "#fcb788",
      "200": "#fb9854",
      "300": "#fa7820",
      "400": "#df5d05",
      "500": "#b84d04",
      "600": "#a24404",
      "700": "#843703",
      "800": "#672b02",
      "900": "#4a1f02",
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
    Tag: {
      defaultProps: {
        colorScheme: "secondary",
      },
    },
  },
});

export default applicationTheme;
