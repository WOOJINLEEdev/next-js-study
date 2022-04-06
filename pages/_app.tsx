import type { AppProps } from "next/app";
import Head from "next/head";
import {
  useState,
  useEffect,
  useCallback,
  ReactElement,
  ReactNode,
} from "react";
import { NextPage } from "next";
import { RecoilRoot } from "recoil";
import GlobalStyle from "styles/global-styles";
import CustomThemeProvider from "components/common/CustomThemeProvider";
import DefaultLayout from "components/common/DefaultLayout";
import { cafeTitle } from "pages";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [scrollStatus, setScrollStatus] = useState(false);

  const handleScrollY = useCallback(() => {
    const pageYOffset = window.pageYOffset;
    if (!scrollStatus && pageYOffset > 199) {
      setScrollStatus(true);
    }

    if (scrollStatus && pageYOffset <= 199) {
      setScrollStatus(false);
    }
  }, [scrollStatus]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollY);

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, [handleScrollY]);

  const getLayout = Component.getLayout;

  return (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <CustomThemeProvider>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta name="author" content="WOOJINLEEdev" />
            <meta name="description" content="WOOJINLEEdev의 Cafe입니다." />
            <link rel="icon" href="/favicon-wj.ico" />
            <title>WOOJINLEEdev Cafe</title>
          </Head>
          {getLayout ? (
            getLayout(<Component {...pageProps} />)
          ) : (
            <DefaultLayout scrollStatus={scrollStatus} cafeTitle={cafeTitle}>
              <Component {...pageProps} />
            </DefaultLayout>
          )}
        </CustomThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
