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
  const [lastRefresh, setLastRefresh] = useState();

  useEffect(async () => {
    let hola=null;
    await Functions.getRefreshLocalDatabase().then(valor=>{
      hola=valor
    });
    /*let hola2=null
    await Time.getAllTime().then(valor=>{
      hola2=valor
    })*/
    //console.log(hola)
    //console.log(typeof(hola))
    //const arrayLastTimeRefresh = hola2.map((doc) => doc.strDate)
    //console.log(arrayLastTimeRefresh)
    //setLastRefresh(arrayLastTimeRefresh[0]);
    setRefresh(hola.toString())
  }, []);

  //console.log(refresh)
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
