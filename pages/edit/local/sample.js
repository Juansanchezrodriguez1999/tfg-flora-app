import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Header from "/components/Header";
import Footer from "/components/Footer";
import { useRouter } from "next/router";
import Form from "/components/Form";
import { FloraSamples } from "/lib/FloraSamples";

const EditLocal = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const [sample, setSample] = useState();

  useEffect(async () => {
    const doc = await FloraSamples.getLocalSample(id);
    doc.Date = doc.Date.toString();
    setSample(doc);
  }, []);

  if (status === "authenticated" && sample !== undefined) {
    return (
      <div className="mx-auto grid place-items-center">
        <Header />
        <Form sample={sample} isLocal={true} />
        <Footer />
      </div>
    );
  } else if (status === "loading" || sample === undefined) {
    return null;
  } else {
    router.push("/signin");
    return null;
  }
};

export default EditLocal;
