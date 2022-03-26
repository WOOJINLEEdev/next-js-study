import type { AppProps } from "next/app";
import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
import { RecoilRoot } from "recoil";
import Header from "components/Header";
import Footer from "components/Footer";
import CustomThemeProvider from "components/CustomThemeProvider";
import GlobalStyle from "styles/global-styles";

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
            <link rel="icon" href="/favicon-wj.ico" />
            <title>WOOJINLEEdev Cafe</title>
          </Head>
          <Header scrollStatus={scrollStatus} cafeTitle={cafeTitle} />
          <Component {...pageProps} />
          <Footer />
        </CustomThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
