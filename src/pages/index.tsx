import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function App() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (sessionData) router.push("/home");
    else router.push("/login");
  }, [sessionData, router]);
}
