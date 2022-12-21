import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import React from "react";
import { Dashboard, useUppy } from "@uppy/react";
import Uppy from "@uppy/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { FloraSamples } from "/lib/FloraSamples";
import { v4 as uuidv4 } from "uuid";
import { GrLocation } from "react-icons/gr";
import { BiSend, BiPlus } from "react-icons/bi";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { Functions } from "./form-components/Functions";
import FormIndex from "./FormIndex";
import { FloraSpecies } from "../lib/FloraSpecies";

export default function Form({ sample, isLocal, refresh}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();
  const [allNaturalParks, setAllNaturalParks] = useState([]);

  //console.log(lastDateTime)
  //console.log(currentDateTime)
  useEffect(() => {
    Functions.getNaturalPark(refresh,setAllNaturalParks);
  }, [refresh]);

  const submitForm = async (data) => {
    await FloraSpecies.insertLocalOne(data.natural_park)
    .then(() => {
        router.push({
          pathname: "/samples",
          query: { success: "naturalParkAdded"  },
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
      <form className="max-w-4xl mt-4 mb-4 bg-white shadow-md rounded px-8 pt-6 pb-8 w-full"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="mb-4">
          <label className="block text-green-500 text-lg font-bold mb-4">
            Add Natural Park
          </label>
        </div>
        <div className="mb-4">
            {!navigator.onLine &&
                <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-yellow-200 rounded">
                No connection, validation postponed to synchronization
                </p>
            }
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="natural_park" >
                Natural Park 
                <span className="text-red-700">*</span>
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="natural_park" type="text"
                {...register("natural_park", { required: true, validate: {
                    local: (value) => !allNaturalParks.includes(value.toLowerCase()), 
                    remote: (value) => !allNaturalParks.includes(value.toLowerCase())
                    }}
                )}
            />
            {errors.natural_park?.type === "local" && (
                <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                Natural Park is already associated with another natural park in the local database
                </p>
            )}
            {errors.natural_park?.type === "remote" && (
                <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                Natural Park is already associated with another natural park in the remote database
                </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-green-200 transition-colors ease-in-out hover:bg-green-400 py-2 px-2 rounded" type="submit">
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
    );
  } else if (status === "loading") {
    return null;
  } else {
    router.push("/signin");
    return null;
  }
}
