import { useSession, signOut } from "next-auth/react";
import { VscSignOut } from "react-icons/vsc";

export default function CustomHeader() {
  const { data: session, status } = useSession();

  return (
    <div className="mx-auto grid place-items-right border-b-2 shadow items-right p-2 w-full grid grid-cols-3 gap-4">
      <link rel="icon" href="/services/flora/app/favicon.ico" type="image/x-icon" />
      <link rel="shortcut icon" href="/services/flora/app/favicon.ico" type="image/x-icon" />
      <div></div>
      <button className="grid justify-items-center">
        <img
          className="flex items-center inline-block bg-white transition-colors ease-in-out hover:bg-green-100 font-medium rounded-full"
          onClick={() => location.reload(false)}
          src="/services/flora/app/logo.png"
          style={{ height: 70 }}
          alt="Logo"
        />
      </button>
      <div className="grid justify-items-end items-center">
        {status === "authenticated" && navigator.onLine &&(
          <>
            <button
              className="bg-red-200 transition-colors ease-in-out hover:bg-red-400 py-1 px-1 rounded text-sm"
              type="button"
              onClick={() =>
                signOut({ redirect: false, callbackUrl: "/signin" })
              }
            >              
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
</svg>
 
            </button>
          </>
        )}
      </div>
    </div>
  );
}
