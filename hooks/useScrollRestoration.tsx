import Router, { NextRouter } from "next/router";
import { useEffect } from "react";

function saveScrollPos(asPath: string) {
  sessionStorage.setItem(
    `scrollPos:${asPath}`,
    JSON.stringify({ x: window.scrollX, y: window.scrollY }),
  );
}

function restoreScrollPos(asPath: string) {
  const json = sessionStorage.getItem(`scrollPos:${asPath}`);
  const scrollPos = json ? JSON.parse(json) : undefined;
  if (scrollPos) {
    window.scrollTo(scrollPos.x, scrollPos.y);
  }
}

export function useScrollRestoration(router: NextRouter) {
  useEffect(() => {
    if (
      typeof window === undefined ||
      !("scrollRestoration" in window.history)
    ) {
      return;
    }

    let shouldScrollRestore = false;
    window.history.scrollRestoration = "manual";
    restoreScrollPos(router.asPath);

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      saveScrollPos(router.asPath);
      delete event.returnValue;
    };

    const onRouteChangeStart = () => {
      saveScrollPos(router.asPath);
    };

    const onRouteChangeComplete = (url: string) => {
      if (shouldScrollRestore) {
        shouldScrollRestore = false;

        restoreScrollPos(url);
      }
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    Router.events.on("routeChangeStart", onRouteChangeStart);
    Router.events.on("routeChangeComplete", onRouteChangeComplete);
    Router.beforePopState(() => {
      shouldScrollRestore = true;
      return true;
    });

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      Router.events.off("routeChangeStart", onRouteChangeStart);
      Router.events.off("routeChangeComplete", onRouteChangeComplete);
      Router.beforePopState(() => true);
    };
  }, [router]);
}
