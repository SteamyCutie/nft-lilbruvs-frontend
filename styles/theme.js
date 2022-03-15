import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance.
let theme = createTheme({
  // customize your theme here
  palette: {
    primary: {
      main: "#000000",
      dark: "#000000",
      light: "#404048",
    },
    secondary: {
      main: "#FFFFFF",
      dark: "#FAFAFA",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

theme = responsiveFontSizes(theme);

export default theme;