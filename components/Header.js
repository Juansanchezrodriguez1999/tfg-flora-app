import { useSession, signOut } from "next-auth/react";
import { VscSignOut } from "react-icons/vsc";

export default function CustomHeader() {
  const { data: session, status } = useSession();

  return (
    <div className="flex justify-between border-b-2 shadow items-center p-2 w-full">
      <link rel="icon" href="favicon.ico" type="image/x-icon" />
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      <link rel="manifest" href="/manifest.json"/>
      <div>
        {status === "authenticated" && (
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        )}
      </div>
      <button>
        <img
          className="flex items-center justify-between center inline-block bg-white transition-colors ease-in-out hover:bg-green-100 font-medium px-2 py-0.5 rounded-full"
          onClick={() => location.reload(false)}
          src="/services/flora/app/logo.png"
          style={{ width: 200, height: 75.84 }}
          alt="Logo"
        />
      </button>
      <div className="flex items-center space-x-4">
        {status === "authenticated" && (
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
              <div>
                {" "}
                <span className="text-grey-500 bg-red-100 px-2 rounded ">
                  {session.user.username}
                </span>
              </div>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
