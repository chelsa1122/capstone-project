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
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;600;700&display=swap"
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
