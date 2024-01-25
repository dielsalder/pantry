import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { AppShell, Button } from "@mantine/core";
import { Home } from "~/features/Home";

export default function App() {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>pantry</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell header={{ height: "60" }} p="md">
        {sessionData ? (
          <Home />
        ) : (
          <AppShell.Main>
            <Button onClick={() => void signIn()}>Sign in</Button>
          </AppShell.Main>
        )}
      </AppShell>
    </>
  );
}
