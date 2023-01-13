import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Header from "/components/Header";
import Footer from "/components/Footer";
import { useRouter } from "next/router";
import Form from "/components/Form";
import { Functions } from "../components/form-components/Functions";


export default function FormPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [refresh, setRefresh] = useState();
  const [lastRefresh, setLastRefresh] = useState();
  console.log("lastrefresh")
  console.log(lastRefresh)

  useEffect(async () => {
    let refreshYesNo=null;
    console.log("lastrefresh")
    console.log(lastRefresh)
    await Functions.getRefreshLocalDatabase().then(valor=>{
      refreshYesNo=valor
    });

    setRefresh(refreshYesNo.toString())
  }, []);

  if (status === "authenticated") {
    return (
      <div className="mx-auto grid place-items-center">
        <Header />
        <Form refresh={refresh} lastRefresh={lastRefresh}/>
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
