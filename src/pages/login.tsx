import { signIn } from "next-auth/react";
import { AppShell, Button } from "@mantine/core";
export default function Login() {
  return (
    <AppShell.Main>
      <Button
        onClick={() => {
          void signIn(undefined, { callbackUrl: "/home" });
        }}
      >
        Sign in
      </Button>
    </AppShell.Main>
  );
}
