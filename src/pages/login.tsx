import { signIn } from "next-auth/react";
import { AppShell, Button, Center, Stack, Title } from "@mantine/core";
export default function Login() {
  return (
    <AppShell.Main>
      <Center>
        <Stack gap="xl">
          <Title>jude food</Title>
          <Button
            onClick={() => {
              void signIn(undefined, { callbackUrl: "/home" });
            }}
          >
            Sign in
          </Button>
        </Stack>
      </Center>
    </AppShell.Main>
  );
}
