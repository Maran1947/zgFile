import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0058ff',
    },
    secondary: {
      main: '#0058ff',
    },
  },
  typography: {
    fontFamily: 'Libre Baskerville, serif',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  }
});