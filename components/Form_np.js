import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiSend, BiPlus } from "react-icons/bi";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { Functions } from "./form-components/Functions";
import { FloraSpecies } from "../lib/FloraSpecies";

export default function Form({ sample, isLocal, refresh }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();
  const [allNaturalParks, setAllNaturalParks] = useState([]);

  useEffect(() => {
    Functions.getNaturalPark(refresh, setAllNaturalParks);
  }, [refresh]);

  const submitForm = async (data) => {
    await FloraSpecies.insertLocalOne(data.natural_site)
      .then(() => {
        router.push({
          pathname: "/samples",
          query: { success: "naturalParkAdded" },
        });
      })
      .catch((e) => {
        router.push({
          pathname: "/samples",
          query: { success: false, code: e.message },
        });
      });
  };

  if (status === "authenticated") {
    return (
      <>
        <title>Add natural site</title>
        <form
          className="max-w-4xl mt-4 mb-4 bg-white shadow-md rounded px-8 pt-6 pb-8 w-full"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="mb-4">
            <label className="block text-green-500 text-lg font-bold mb-4">
              Add Natural Site
            </label>
          </div>
          <div className="mb-4">
            {!navigator.onLine && (
              <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-yellow-200 rounded">
                No connection, validation postponed to synchronization
              </p>
            )}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="natural_site"
            >
              Natural Site
              <span className="text-red-700">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="natural_site"
              type="text"
              {...register("natural_site", {
                required: true,
                validate: {
                  local: (value) =>
                    !allNaturalParks.includes(value.toLowerCase()),
                  remote: (value) =>
                    !allNaturalParks.includes(value.toLowerCase()),
                },
              })}
            />
            {errors.natural_site?.type === "local" && (
              <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                Natural Site is already associated with another natural site in
                the local database
              </p>
            )}
            {errors.natural_site?.type === "remote" && (
              <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                Natural Site is already associated with another natural site in
                the remote database
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-200 transition-colors ease-in-out hover:bg-green-400 py-2 px-2 rounded"
              type="submit"
            >
              <div className="flex items-center justify-center space-x-2">
                <BiSend />
                <span>Send</span>
              </div>
            </button>
            <Link href="/samples">
              <a className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800">
                Back to sample list
              </a>
            </Link>
          </div>
        </form>
      </>
    );
  } else if (status === "loading") {
    return null;
  } else {
    router.push("/signin");
    return null;
  }
}
