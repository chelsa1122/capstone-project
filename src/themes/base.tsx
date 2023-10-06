import { createTheme } from "@mui/material/styles";
import { ThemeOptions } from "@mui/material/styles/createTheme";

export interface ThemeConfigInterface extends ThemeOptions {
  palette: {
    [key: string]: any;
    text: any;
  };
}

export const baseTheme: ThemeConfigInterface = createTheme({
  palette: {
    primary: {
      main: "#3F51B5",
    },
    secondary: {
      main: "#FEFEFE",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
  },
  typography: {
    fontFamily: "Oswald, Arial, sans-serif",
  },
});
