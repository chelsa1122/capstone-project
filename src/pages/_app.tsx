import { baseTheme } from "@/themes/base";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppProps } from "next/app";

function App({ Component }: AppProps) {
  return (
    <main>
      <CssBaseline />
      <ThemeProvider theme={baseTheme}>
        <Component />
      </ThemeProvider>
    </main>
  );
}

export default App;
