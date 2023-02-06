import { useSession, getSession } from "next-auth/react";
import React from "react";
import Header from "/components/Header";
import Footer from "/components/Footer";
import { useRouter } from "next/router";
import { FloraSamplesHandler } from "/lib/FloraSamplesHandler";
import Details from "/components/Details";
import Link from "next/link";

const View = ({ sample }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div className="mx-auto grid place-items-center">
        <Header />
        <Details sample={sample} isLocal={false} />
        <Link href="/samples">
          <a className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800 my-4">
            Back to sample list
          </a>
        </Link>
        <Footer />
      </div>
    );
  } else if (status === "loading") {
    return null;
  } else {
    router.push("/signin");
    return null;
  }
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const sample = await FloraSamplesHandler.getOne(id);
  sample._id = sample._id.toString();
  sample.created_at = sample.created_at.toString();

  const session = await getSession(ctx);
  if (!sample || !sample.Authors.includes(session.user.username)) {
    return {
      notFound: true,
    };
  }

  return { props: { sample } };
}

export default View;
