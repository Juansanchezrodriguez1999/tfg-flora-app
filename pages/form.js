import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Header from "/components/Header";
import Footer from "/components/Footer";
import { useRouter } from "next/router";
import Form from "/components/Form";
import { Functions } from "../components/form-components/Functions";
import { Time } from "../lib/Time";


export default function FormPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [refresh, setRefresh] = useState();

  useEffect(async () => {
    let hola=null;
    await Functions.getRefreshLocalDatabase().then(valor=>{
      hola=valor
    });
    //console.log(hola)
    //console.log(typeof(hola))
    setRefresh(hola.toString())
  }, []);

  //console.log(refresh)
  if (status === "authenticated") {
    return (
      <div className="mx-auto grid place-items-center">
        <Header />
        <Form refresh={refresh}/>
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
