import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "mantine-datatable/styles.layer.css";
import { theme } from "~/theme";
import { Layout } from "~/components/Layout";
import { ModalsProvider } from "@mantine/modals";
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
