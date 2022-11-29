import { useSession } from "next-auth/react";
import React from "react";
import Header from "/components/Header";
import Footer from "/components/Footer";
import { useRouter } from "next/router";
import Form from "/components/Form";

export default function FormPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div className="mx-auto grid place-items-center">
        <Header />
        <Form />
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
