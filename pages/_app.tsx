import type { AppProps } from "next/app";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  useState,
  useEffect,
  useCallback,
  ReactElement,
  ReactNode,
} from "react";
import { RecoilRoot } from "recoil";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

import { cafeTitle } from "pages";
import CustomThemeProvider from "components/common/CustomThemeProvider";
import DefaultLayout from "components/common/DefaultLayout";
import GlobalStyle from "styles/global-styles";

import * as ga from "lib/ga";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const [scrollState, setScrollState] = useState(false);
  const [queryClient] = useState(() => new QueryClient());

  const handleScrollY = useCallback(() => {
    const scrollY = window.scrollY;
    if (!scrollState && scrollY > 199) {
      setScrollState(true);
    }

    if (scrollState && scrollY <= 199) {
      setScrollState(false);
    }
  }, [scrollState]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollY);

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, [handleScrollY]);

  useEffect(() => storePathValues, [router.asPath]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  function storePathValues() {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;

    const prevPath = storage.getItem("currentPath") as string;
    storage.setItem("prevPath", prevPath);

    if (globalThis.location.search !== "") {
      return storage.setItem("currentPath", globalThis.location.search);
    }

    storage.setItem("currentPath", globalThis.location.pathname);
  }

  const getLayout = Component.getLayout;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RecoilRoot>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <meta name="author" content="WOOJINLEEdev" />
              <meta
                name="description"
                content="WOOJINLEEdev??? Cafe?????????. Next.js??? ???????????? ?????? ?????????????????????. ????????? ???????????? ?????????????????????."
              />
              <meta name="keywords" content="Nextjs, React, WOOJINLEEdev" />
              <meta
                name="google-site-verification"
                content="BxNfV6gcR0z9GxeqFHAk_bwqCphDjRxmiWugCLYDNXI"
              />
              <meta
                name="naver-site-verification"
                content="f33bea3e52e797faea146f16a95eaa110cf02d18"
              />
              <meta property="og:type" content="website" />
              <meta
                property="og:image"
                content="https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/5_300x300.jpg"
              />
              <meta property="og:image:type" content="image/jpeg" />
              <meta
                property="og:url"
                content="https://next-js-study-five.vercel.app/"
              />
              <meta property="og:site_name" content="WOOJINLEEdev Cafe" />
              <meta property="og:locale" content="ko_KR" />
              <link rel="icon" href="/favicon-wj.ico" />
              <title>WOOJINLEEdev Cafe</title>
            </Head>
            <CustomThemeProvider>
              <GlobalStyle />
              {getLayout ? (
                getLayout(<Component {...pageProps} />)
              ) : (
                <DefaultLayout scrollState={scrollState} cafeTitle={cafeTitle}>
                  <Component {...pageProps} />
                </DefaultLayout>
              )}
            </CustomThemeProvider>
          </RecoilRoot>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
