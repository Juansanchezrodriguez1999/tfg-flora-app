import "tailwindcss/tailwind.css";

import { SessionProvider } from "next-auth/react";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session} basePath="/services/flora/app/api/auth">
      <Component {...pageProps} />
    </SessionProvider>
  );
}
