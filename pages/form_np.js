import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Header from "/components/Header";
import Footer from "/components/Footer";
import { useRouter } from "next/router";
import Form_np from "/components/Form_np";
import { Functions } from "../components/form-components/Functions";

export default function FormPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [refresh, setRefresh] = useState();

  useEffect(async () => {
    let refreshYesNo = false;
    await Functions.getRefreshLocalDatabase().then((valor) => {
      refreshYesNo = valor;
    });

    setRefresh(refreshYesNo);
  }, []);

  if (status === "authenticated") {
    return (
      <div className="mx-auto grid place-items-center">
        <Header />
        <Form_np refresh={refresh} />
        <Footer />
      </div>
    );
  } else if (status === "loading") {
    return null;
  } else {
    router.push("/signin");
    return null;
  }
}
