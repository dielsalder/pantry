import { useAtomValue } from "jotai";
import Head from "next/head";
import Link from "next/link";
import { userAtom } from "~/user";
import { AppShell } from "@mantine/core";

import { api } from "~/utils/api";

export default function Home() {
  const userId = useAtomValue(userAtom);

  return (
    <>
      <Head>
        <title>pantry</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <AppShell>My app</AppShell>
      </main>
    </>
  );
}
