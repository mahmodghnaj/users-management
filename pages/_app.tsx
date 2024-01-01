import { type ReactElement, type ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import QueryClientProvider from "@/providers/QueryClientProvider";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  const layout = getLayout(<Component {...pageProps} />);

  const wrappedLayout = (
    <QueryClientProvider pageProps={pageProps}>
      {layout as ReactElement}
    </QueryClientProvider>
  );

  return wrappedLayout;
}
