import { extendTheme } from "@chakra-ui/react";

// Custom theme definition with jewel tones
export const applicationVividTheme = extendTheme({
  colors: {
    background: {
      "50": "#fcf6ea",
      "100": "#fbf2e1",
      "200": "#f9edd5",
      "300": "#f8e7c9",
      "400": "#f6e2bd",
      "500": "#f5deb4",
      "600": "#edc47a",
      "700": "#e3a22c",
      "800": "#a27016",
      "900": "#543a0b",
    },
    secondary: {
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
      "50": "#f9e2c3",
      "100": "#f7d5a9",
      "200": "#f3c487",
      "300": "#f0b365",
      "400": "#eda343",
      "500": "#ea9629",
      "600": "#dc8616",
      "700": "#b46e12",
      "800": "#8c550e",
      "900": "#643d0a",
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

export default applicationVividTheme;
