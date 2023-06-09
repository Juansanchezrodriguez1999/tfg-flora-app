import { useSession, signOut } from "next-auth/react";

export default function CustomHeader() {
  const { data: session, status } = useSession();

  return (
    <div className="mx-auto grid place-items-right border-b-2 shadow items-right p-2 w-full grid grid-cols-3 gap-4">
      <link rel="icon" href="/services/flora/app/favicon.ico" type="image/x-icon" />
      <link rel="shortcut icon" href="/services/flora/app/favicon.ico" type="image/x-icon" />
      <div></div>
      <div className="grid justify-items-center">
        <img
          className="flex items-center inline-block bg-white ease-in-out font-medium "
          src="/services/flora/app/logo.png"
          style={{ height: 70 }}
          alt="Logo"
        />
      </div>
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
            <a className="flex gap-1 font-medium items-center wx-auto justify-items-end ">
                  <span className="text-sm"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
</svg>
                  </span>Log Out
                </a>         
            
 
            </button>
          </>
        )}
      </div>
    </div>
  );
}
