import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/samples");
    } else if (status === "loading") {
      return null;
    } else {
      router.push("/signin");
    }
  }, [status]);

  return null;
}
