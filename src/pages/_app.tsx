import { userAtom } from "@/atoms";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import urls from "@/constants/urls";
import { baseTheme } from "@/themes/base";
import { CssBaseline, ThemeProvider } from "@mui/material";
import axios from "axios";
import { Provider, useStore } from "jotai";
import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";

axios.defaults.withCredentials = true;

const InitializeAtom = ({
  children,
  state,
}: {
  children: React.ReactNode;
  state: {
    user: any;
  };
}) => {
  const store = useStore();
  if (state.user) store.set(userAtom, state.user);

  return children;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Oswald&display=swap"
        />
      </Head>
      <CssBaseline />
      <ThemeProvider theme={baseTheme}>
        <Provider>
          <InitializeAtom
            state={{
              user: pageProps?.user,
            }}
          >
            <Navbar />
            <main
              style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Component {...pageProps} />
            </main>
            <Footer />
          </InitializeAtom>
        </Provider>
      </ThemeProvider>
    </div>
  );
}

const protectedRoutes = ["/pet-details", "/profile"];

MyApp.getInitialProps = async (event: AppContext) => {
  const { ctx } = event;
  const { req, res } = ctx;

  const pageProps = await App.getInitialProps(event);

  const user = await axios.get(`${urls.apiHost}/check-session`, {
    headers: {
      Cookie: req?.headers.cookie,
    },
  });
  const { userData } = user.data;

  if (!(req && res)) {
    return {
      pageProps: {
        ...pageProps,
        user: userData,
      },
    };
  }

  if (!userData) {
    if (protectedRoutes.includes(ctx.pathname)) {
      res.writeHead(307, { Location: "/login" });
      res.end();
      return;
    }
  }

  if (userData) {
    const petDetailsRes = await axios.get(`${urls.apiHost}/getPetDetails`, {
      headers: {
        Cookie: req.headers.cookie,
      },
    });
    const petDetails = petDetailsRes.data;

    if (petDetails.length < 1 && ctx.pathname !== "/pet-details") {
      res.writeHead(307, { Location: "/pet-details" });
      res.end();
    } else if (ctx.pathname === "/pet-details" && petDetails.length > 0) {
      res.writeHead(307, { Location: "/" });
      res.end();
    }
  }

  return { pageProps: { ...pageProps, user: userData } };
};

export default MyApp;
