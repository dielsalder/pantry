import { useAtomValue } from "jotai";
import Head from "next/head";
import { userAtom } from "~/user";
import { AppShell, Button, Loader, Title } from "@mantine/core";

import { api } from "~/utils/api";
import { Item } from "~/features/Item";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { ItemDetails } from "~/features/ItemDetails";
import { getQueryKey } from "@trpc/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { NewItemDetails } from "~/features/NewItemDetails";
import { Collection } from "~/features/Collection";

export default function Home() {
  const userId = useAtomValue(userAtom);
  const { data, isLoading } = api.user.read.useQuery(userId);

  return (
    <>
      <Head>
        <title>pantry</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell header={{ height: "60" }} p="md">
        <AppShell.Header p="md">
          <Title order={3}>jude food</Title>
        </AppShell.Header>
        <AppShell.Main>
          {isLoading ? (
            <Loader />
          ) : (
            data?.collections.map(({ id }) => <Collection id={id} />)
          )}
          <Button>New Collection</Button>
        </AppShell.Main>
      </AppShell>
    </>
  );
}
