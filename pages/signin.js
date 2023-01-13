import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Header from "/components/Header";
import { useRouter } from "next/router";

export default function SignnIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: session, status } = useSession();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const validateCredentials = (data) => {
    signIn("credentials", {
      redirect: false,
      username: username,
      password: password,
    }).then((res) => {
      if (!res.ok) {
        setErrorMessage("Invalid user/password combination.");
      }
    });
  };

  if (status === "authenticated") {
    router.push("/samples");
    return null;
  } else {
    return (
      <>
        <title>SigIn</title>
        <div>
          <Header />
          <div className="grid place-items-center h-screen">
            <div className="max-w-2xl px-8 w-full">
              {errorMessage &&
                errorMessage !== "User is incorrect or disabled" &&
                errorMessage !== "The password is incorrect" && (
                  <div
                    className="text-gray-700 text-sm font-bold bg-red-200 rounded-lg p-4 mb-4"
                    role="alert"
                  >
                    <span className="font-medium">Error!</span> {errorMessage}
                  </div>
                )}
              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit(validateCredentials)}
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    {...register("username", { required: true })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="John Doe"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors.username?.type === "required" &&
                    (!username || username === "") && (
                      <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                        Username is required
                      </p>
                    )}
                  {errorMessage === "User is incorrect or disabled" && (
                    <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                      {errorMessage}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    {...register("password", { required: true })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password?.type === "required" &&
                    (!password || password === "") && (
                      <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                        Password is required
                      </p>
                    )}
                  {errorMessage === "The password is incorrect" && (
                    <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                      {errorMessage}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-green-500 transition-colors ease-in-out hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                    type="submit"
                  >
                    Sign In
                  </button>
                  <Link href="https://enbic2lab.uma.es/auth/signUp">
                    <a className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800">
                      Create new account
                    </a>
                  </Link>
                </div>
              </form>
              <p className="text-center text-gray-500 text-xs">
                &copy;2021 Khaos Research. All rights reserved.
              </p>
            </div>
            <div></div>
          </div>
        </div>
      </>
    );
  }
}
