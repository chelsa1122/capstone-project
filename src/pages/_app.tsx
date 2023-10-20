import { baseTheme } from "@/themes/base";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppProps } from "next/app";
import Head from "next/head";

function App({ Component }: AppProps) {
  return (
    <main>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Oswald&display=swap"
        />
      </Head>
      <CssBaseline />
      <ThemeProvider theme={baseTheme}>
        <Component />
      </ThemeProvider>
    </main>
  );
}

export default App;
