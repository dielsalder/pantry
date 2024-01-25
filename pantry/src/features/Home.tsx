import { AppShell, Button, Group, Title } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";

export const Home = () => {
  const { data: sessionData } = useSession();
  return (
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
  );
};
