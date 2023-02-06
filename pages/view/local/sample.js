import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Header from "/components/Header";
import Footer from "/components/Footer";
import { useRouter } from "next/router";
import Details from "/components/Details";
import { FloraSamples } from "/lib/FloraSamples";
import Link from "next/link";

const ViewLocal = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const [sample, setSample] = useState();

  useEffect(async () => {
    const doc = await FloraSamples.getLocalSample(id);
    delete doc.id;
    doc.created_at = doc.created_at.toString();
    setSample(doc);
  }, []);

  if (status === "authenticated" && sample !== undefined) {
    return (
      <div className="mx-auto grid place-items-center">
        <Header />
        <Details sample={sample} isLocal={true} />
        <Link href="/samples">
          <a className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800 my-4">
            Back to sample list
          </a>
        </Link>
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

export default ViewLocal;
