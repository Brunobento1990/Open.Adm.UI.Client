import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          body1: "label",
        },
      },
    },
  },
  shape: {
    borderRadius: 5,
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
  palette: {
    primary: {
      main: "#2c90ce",
    },
    text: {
      primary: "#f6f8fc",
      secondary: "#f1f1f1",
    },
    mode: "dark",
    background: {
      default: "#1c1c1c",
      paper: "#242424",
    },
  },
});
