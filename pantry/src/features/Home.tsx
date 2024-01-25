import { AppShell, Button, Group, Loader, Title } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { Collection } from "./Collection";

export const Home = () => {
  const { data: sessionData } = useSession();
  const { data, isLoading } = api.user.read.useQuery();
  return (
    <>
      <AppShell.Header p="md">
        <Group justify="space-between">
          <Title order={3}>jude food</Title>
          <Button
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        {isLoading ? (
          <Loader />
        ) : (
          data?.collections.map(({ id }) => <Collection id={id} key={id} />)
        )}
      </AppShell.Main>
    </>
  );
};
