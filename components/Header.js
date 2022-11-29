import { useSession, signOut } from "next-auth/react";
import { VscSignOut } from "react-icons/vsc";

export default function CustomHeader() {
  const { data: session, status } = useSession();

  return (
    <div className="flex justify-between border-b-2 shadow items-center p-2 w-full">
      <img className="w-12" src = "/services/flora/app/logo.svg" alt="Logo"/>
      <label  className="flex items-center justify-between space-x-2 text-green-500 text-lg font-bold px-20 center"> 
                  FLORA APP
     </label>
      <div className="flex items-center space-x-4">
        {status==="authenticated" &&(
          <>
          <button
            className="bg-red-200 transition-colors ease-in-out hover:bg-red-400 py-2 px-2 rounded"
            type="button"
            onClick={() =>
              signOut({ redirect: false, callbackUrl: "/signin" })
            }
          >
            <div className="flex items-center justify-center space-x-2 font-bold">
              <VscSignOut />
              <span>Sign out</span>
            </div>
            <div> <span className="text-grey-500 bg-red-100 px-2 rounded ">{session.user.username}</span></div>
          </button>
          </>
        )}
      </div>
    </div>
  );
}
