import type { AppProps } from "next/app";
import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
import { RecoilRoot } from "recoil";
import Header from "components/Header";
import Footer from "components/Footer";
import CustomThemeProvider from "components/CustomThemeProvider";
import GlobalStyle from "styles/global-styles";
import Menu from "components/Menu";

function MyApp({ Component, pageProps }: AppProps) {
  const [cafeTitle, setCafeTitle] = useState("WOOJINLEEdev Cafe");
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
          <Header scrollStatus={scrollStatus} cafeTitle={cafeTitle} />
          <Menu />
          <Component {...pageProps} />
          <Footer />
        </CustomThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
