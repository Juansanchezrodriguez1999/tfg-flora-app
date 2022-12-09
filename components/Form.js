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

export default function Form({ sample, isLocal, refresh}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    setValue,
  } = useForm();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [utm, setUTM] = useState();
  const [mode, setMode] = useState(sample ? "utm" : "latlon");
  const [isGeolocationAvailable, setIsGeolocationAvailable] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [currentAuthor, setCurrentAuthor] = useState();
  const [species, setSpecies] = useState([]);
  const [currentSpecies, setCurrentSpecies] = useState();
  const [currentInd, setCurrentInd] = useState();
  const [authorClick, setAuthorClick] = useState(false);
  const [speciesClick, setSpeciesClick] = useState(false);
  const [thereIsSubcommunity, setThereIsSubcommunity] = useState(false);
  const [subcommunityAuthors, setSubcommunityAuthors] = useState([]);
  const [currentSubcommunityAuthor, setCurrentSubcommunityAuthor] = useState();
  const [subcommunityAuthorClick, setSubcommunityAuthorClick] = useState(false);
  const [staticAuthors, setStaticAuthors] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [allSpecies, setAllSpecies] = useState([]);
  const [naturalParkSpecies, setNaturalParkSpecies] = useState([]);
  const [thereIsCommunity, setThereIsCommunity] = useState(false);
  const [communityAuthors, setCommunityAuthors] = useState([]);
  const [currentCommunityAuthor, setCurrentCommunityAuthor] = useState();
  const [communityAuthorClick, setCommunityAuthorClick] = useState(false);
  const [localRegisNumbers, setLocalRegisNumbers] = useState([]);
  const [remoteRegisNumbers, setRemoteRegisNumbers] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState([]);
  const [lastDateTime, setLastDateTime] = useState([]);
  const uppy = useUppy(() => {
    return new Uppy({
      autoProceed: false,
      restrictions: {
        allowedFileTypes: ["image/*"],
      },
    });
  });

  //console.log(lastDateTime)
  //console.log(currentDateTime)
  useEffect(() => {
    //setRefresh(Functions.refreshLocalDataBase());
    Functions.getAuthors(setStaticAuthors,setUsernames,refresh);
    setIsGeolocationAvailable("geolocation" in navigator);
    //Functions.refreshLocalDataBase();
    Functions.getAllSpecies(setAllSpecies, refresh);
    Functions.getLocalRegisNumbers(setLocalRegisNumbers,isLocal);
    Functions.getRemoteRegisNumbers(setRemoteRegisNumbers);
    if (sample) {
      setValue("no_register", sample._id);
      setAuthors(sample.Authors);
      setValue("group", sample.Group);
      setValue("project", sample.Project);
      setValue("location", sample.Location);
      setValue("natural_park", sample.Natural_Park);
      setUTM(sample.UTM);
      setValue("utm", sample.UTM);
      setValue("lithology", sample.Lithology);
      setValue("coverage", sample.Coverage);
      setValue("altitude", sample.Altitude);
      setValue("plotslope", sample.Plot_Slope);
      setValue("vegetationheight", sample.Alt_Veg);
      setValue("plotarea", sample.Plot_Area);
      setValue("plotorientation", sample.Plot_Orientation);
      setValue("ecology", sample.Ecology);
      if (sample.Community) setThereIsCommunity(true);
      setValue("community", sample.Community);
      setValue("community_year", sample.Community_Year);
      setCommunityAuthors(sample.Community_Authors);
      if (sample.Subcommunity) setThereIsSubcommunity(true);
      setValue("subcommunity", sample.Subcommunity);
      setValue("subcommunity_year", sample.Subcommunity_Year);
      setSubcommunityAuthors(sample.Subcommunity_Authors);
      setSpecies(sample.Species);
      if (!isLocal) {
        FloraSamples.getPictures(sample.Pictures).then((urls) => {
          urls.map((url, index) => {
            fetch(url)
              .then((response) => response.blob())
              .then((blob) => {
                var fileName = sample.Pictures[index].split("/").reverse()[0];
                return new File([blob], fileName, { type: blob.type });
              })
              .then((file) => {
                uppy.addFile({
                  name: file.name,
                  type: file.type,
                  data: file,
                  remote: true,
                });
              });
          });
        });
      } else {
        sample.Pictures.map((img) => uppy.addFile(img));
      }
    }
  }, [refresh]);

  const submitForm = (data) => {
    uppy
      .upload()
      .then(async (files) => {
        const date = sample ? new Date(sample.Date) : new Date();
        const final_utm =
          mode === "utm"
            ? utm
            : Functions.getUTMFromCoordinates(data.latitude, data.longitude);
        const final_latlon = 
          mode === "latlon"
            ? [latitude, longitude]
            : Functions.getCoordinatesFromUTM(data.utm);
        const final_c_name = thereIsCommunity ? data.community : "";
        const final_c_authors = thereIsCommunity ? communityAuthors : [];
        const final_c_year = thereIsCommunity ? data.community_year : "";
        const final_subc_name = thereIsSubcommunity ? data.subcommunity : "";
        const final_subc_authors = thereIsSubcommunity
          ? subcommunityAuthors
          : [];
        const final_subc_year = thereIsSubcommunity
          ? data.subcommunity_year
          : "";
        let id;
        if (!isLocal && sample && sample.Pictures.length > 0)
          id = sample.Pictures[0].split("/").reverse()[1];
        else if (isLocal) id = sample.id;
        else id = uuidv4();
        const dataObject = {
          id: id,
          _id:data.no_register,
          Date: date,
          Authors: authors,
          Group: data.group,
          Project: data.project,
          Location: data.location,
          Natural_Park: data.natural_park,
          UTM: final_utm,
          Latitude: final_latlon[0],
          Longitude: final_latlon[1],
          Lithology: data.lithology,
          Coverage: data.coverage,
          Altitude: data.altitude,
          Plot_Slope: data.plotslope,
          Alt_Veg: data.vegetationheight,
          Plot_Area: data.plotarea,
          Plot_Orientation: data.plotorientation,
          Ecology: data.ecology,
          Community: final_c_name,
          Community_Authors: final_c_authors,
          Community_Year: final_c_year,
          Subcommunity: final_subc_name,
          Subcommunity_Authors: final_subc_authors,
          Subcommunity_Year: final_subc_year,
          Species: species,
          Pictures: files.successful,
          RemoteIdToUpdate: !isLocal && sample ? sample._id : null,
          PicturesToRemove:
            !isLocal && sample && sample.Pictures.length > 0
              ? sample.Pictures
              : null,
        };
        if (isLocal && sample) {
          await FloraSamples.updateLocalOne(id, dataObject).catch(() => {
            throw new Error("EDU");
          });
        } else {
          await FloraSamples.insertLocalOne(dataObject).catch(() => {
            throw new Error("EDI");
          });
        }
        if (!navigator.onLine) throw new Error("LOC");
      })
      .then(() => {
        router.push({
          pathname: "/samples",
          query: { success: true },
        });
      })
      .catch((e) => {
        router.push({
          pathname: "/samples",
          query: { success: false, code: e.message },
        });
      });
  };
  useEffect(() => {
    if (status === "authenticated" && !sample)
      setAuthors([...authors, session.user.username]);
  }, [status]);
  if (status === "authenticated") {
    return (
      <form className="max-w-4xl mt-4 mb-4 bg-white shadow-md rounded px-8 pt-6 pb-8 w-full"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="mb-4">
          <label className="block text-green-500 text-lg font-bold mb-4">
            Identification
          </label>
        </div>
        <div className="mb-4">
          {!navigator.onLine &&
            <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-yellow-200 rounded">
              No connection, validation postponed to synchronization
            </p>
          }
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="no_register" >
            Nº Register 
            <span className="text-red-700">*</span>
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="no_register" type="text"
            {...register("no_register", { required: true, validate: {
                local: (value) => !localRegisNumbers.includes(value),
                remote: (value) => !remoteRegisNumbers.includes(value) 
              }}
            )}
          />
          {errors.no_register?.type === "local" && (
            <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
              Nº Register is already associated with another sample in the local database
            </p>
          )}
          {errors.no_register?.type === "remote" && (
            <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
              Nº Register is already associated with another sample in the remote database
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="group" >
            Group <span className="text-red-700">*</span>
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="group" type="text"
            {...register("group", { required: true })}
          />
          {errors.group?.type === "required" && (
            <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
              Group is required
            </p>
          )}
        </div>
        <FormIndex errors={errors} field="Group"/>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="project" >
            Project <span className="text-red-700">*</span>
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="project" type="text"
            {...register("project", { required: true })}
          />
          {errors.project?.type === "required" && (
            <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
              Project is required
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author_name" >
            Authors
          </label>
          <div className="flex flex-wrap mb-2 items-center">
            <div className="md:w-3/4 mb-2 md:mb-0">
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="author_name" type="text" list="authors_list"
                {...register("author_name", {
                  validate: (value) => !value || value === "",
                })}
                onChange={(e) => {
                  setCurrentAuthor(e.target.value);
                  setAuthorClick(false);
                }}
              />
              <datalist id="authors_list">
                {staticAuthors.map((reg_author, index) => (
                  <option key={index} value={reg_author.username}>
                    {reg_author.fullname}
                  </option>
                ))}
              </datalist>
              {errors.author_name?.type === "validate" &&
                currentAuthor !== "" && (
                  <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                    You must empty the field or add the author to the list
                  </p>
                )}
              {authorClick && authors.includes(currentAuthor) && (
                <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                  The author is already on the list
                </p>
              )}
            </div>
            <div className="md:w-1/4 px-3 mb-2 md:mb-0">
              <button className="inline-flex items-center justify-center w-7 h-7 text-white duration-150 bg-green-500 transition-colors ease-in-out hover:bg-green-700 rounded-full focus:shadow-outline disabled:opacity-30" type="button"
                disabled={!usernames.includes(currentAuthor)}
                onClick={() => {
                  Functions.addAuthor(currentAuthor,authors,setAuthors,setCurrentAuthor,setValue);
                  setAuthorClick(true);
                }}
              >
                <BiPlus />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap max-w-4xl mb-4">
          {authors.map((author, index) => (
            <span className="flex-initial text-gray-700 font-bold pl-2 pr-2 bg-green-200 rounded mb-2 mr-2" key={index} >
              <div className="flex space-x-2 items-center">
                <p className="flex-initial">{author}</p>
                {author !== session.user.username && (
                  <a className="flex-initial inline-flex items-center justify-center w-4 h-4 ml-2 mr-2 text-white transition-colors duration-150 rounded-full focus:shadow-outline"
                    onClick={() => Functions.removeAuthor(author,authors,setAuthors)}
                  >
                    <svg fill="#10B981" viewBox="0 0 24 24" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" >
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z" />
                    </svg>
                  </a>
                )}
              </div>
            </span>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-green-500 text-lg font-bold mb-4">
            Location
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location" >
            Locationes <span className="text-red-700">*</span>
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="location" type="text"
            {...register("location", { required: true })}
          />
          {errors.location?.type === "required" && (
            <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
              Location is required
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="natural_park" >
            Natural park
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="natural_park" type="text" list="np_list"
            {...register("natural_park")}
            onChange={(e) => Functions.getSpecies(e.target.value,allSpecies,setNaturalParkSpecies)}
          />
          <datalist id="np_list">
            {allSpecies.map((np_doc, index) => (
              <option key={index}>{np_doc._id}</option>
            ))}
          </datalist>
        </div>
        <div className="mb-4">
          <label className="block text-green-500 text-lg font-bold mb-4">
            Georeferencing
          </label>
        </div>
        <div className="mb-4">
          <ul className="flex space-x-4">
            <li
              className={
                mode === "latlon"
                  ? "cursor-pointer py-2 px-4 border-b-8 text-green-500 border-green-500"
                  : "cursor-pointer py-2 px-4 text-gray-500 border-b-8"
              }
              onClick={() => {
                setMode("latlon");
                setUTM("");
                setValue("utm", "");
              }}
            >
              Coordinates
            </li>
            <li
              className={
                mode === "utm"
                  ? "cursor-pointer py-2 px-4 border-b-8 text-green-500 border-green-500"
                  : "cursor-pointer py-2 px-4 text-gray-500 border-b-8"
              }
              onClick={() => {
                setMode("utm");
                setLatitude("");
                setValue("latitude", "");
                setLongitude("");
                setValue("longitude", "");
              }}
            >
              UTM
            </li>
          </ul>
        </div>
        {mode === "latlon" && (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latitude">
                Latitude <span className="text-red-700">*</span>
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="latitude" type="number" step="any"
                {...register("latitude", {
                  required: mode === "latlon",
                  min: -80,
                  max: 84,
                })}
                onChange={(e) => setLatitude(e.target.value)}
              />
              {(errors.latitude?.type === "required" || isSubmitted) &&
                (!latitude || latitude === "") && (
                  <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                    Latitude is required
                  </p>
              )}
              {(errors.latitude?.type === "max" ||
                errors.latitude?.type === "min" ||
                isSubmitted) &&
                (latitude < -80 || latitude > 84) && (
                  <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                    Latitude must be in the range (-80, 84)
                  </p>
                )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longitude">
                Longitude <span className="text-red-700">*</span>
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="longitude" type="number" step="any"
                {...register("longitude", {
                  required: mode === "latlon",
                  min: -180,
                  max: 180,
                })}
                onChange={(e) => setLongitude(e.target.value)}
              />
              {(errors.longitude?.type === "required" || isSubmitted) &&
                (!longitude || longitude === "") && (
                  <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                    Longitude is required
                  </p>
                )}
              {(errors.longitude?.type === "max" ||
                errors.longitude?.type === "min" ||
                isSubmitted) &&
                (longitude < -180 || longitude > 180) && (
                  <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                    Longitude must be in the range (-180, 180)
                  </p>
                )}
            </div>
          </div>
        )}
        {mode === "utm" && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="utm" >
              UTM <span className="text-red-700">*</span>
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline uppercase" id="utm" type="text"
              {...register("utm", {
                required: mode === "utm",
                validate: (value) => Functions.validateUTM(value),
              })}
              onChange={(e) => setUTM(e.target.value)}
            />
            {(errors.utm?.type === "required" || isSubmitted) &&
              (!utm || utm === "") && (
                <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                  UTM is required
                </p>
              )}
            {(errors.utm?.type === "validate" || isSubmitted) &&
              !Functions.validateUTM(utm) && (
                <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                  UTM is not valid, e.g: 30S UF 71 63
                </p>
              )}
          </div>
        )}
        {isGeolocationAvailable && (
          <div className="flex items-center justify-between mb-4">
            <button className="bg-green-200 transition-colors ease-in-out hover:bg-green-400 py-2 px-2 rounded" type="button"
              onClick={() => Functions.getCoordinates(mode,setUTM,setLatitude,setLongitude,setValue)}
            >
              <div className="flex justify-center items-center space-x-2">
                <GrLocation />
                <span>Get current location</span>
              </div>
            </button>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-green-500 text-lg font-bold mb-4">
            Biotope and plant community data
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lithology" >
            Lithology
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lithology" type="text"
            {...register("lithology")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverage">
            Coverage (%)
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="coverage" type="number" step="any"
            {...register("coverage", { min: 0, max: 100 })}
          />
          {(errors.coverage?.type === "min" ||
            errors.coverage?.type === "max") && (
            <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
              Coverage must be in the range (0, 100)
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="altitude" >
            Altitude (m)
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="altitude" type="number" step="any"
            {...register("altitude", { min: 0 })}
          />
          {errors.altitude?.type === "min" && (
            <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
              Altitude must be positive
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="plotslope" >
            Plot Slope (º)
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="plotslope" type="number" step="any"
            {...register("plotslope", { min: 0, max: 180 })}
          />
          {(errors.plotslope?.type === "min" ||
            errors.plotslope?.type === "max") && (
            <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
              Plot Slope must be in the range (0, 180)
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vegetationheight">
            Vegetation Height (cm)
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="vegetationheight" type="number" step="any"
            {...register("vegetationheight", { min: 0 })}
          />
          {errors.vegetationheight?.type === "min" && (
            <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
              Vegetation height must be positive
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="plotarea" >
            Plot Area (m2)
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="plotarea" type="number" step="any"
            {...register("plotarea", { min: 0 })}
          />
          {errors.plotarea?.type === "min" && (
            <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
              Plot area must be positive
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="plotorientation" >
            Plot Orientation
          </label>
          <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="plotorientation" defaultValue=""
            {...register("plotorientation")}
          >
            <option value="" disabled hidden />
            <option value="N">North (N)</option>
            <option value="NNE">North-northeast (NNE)</option>
            <option value="NE">NorthEast (NE)</option>
            <option value="ENE">East-northeast (ENE)</option>
            <option value="E">East (E)</option>
            <option value="ESE">East-southeast (ESE)</option>
            <option value="SE">SouthEast (SE)</option>
            <option value="SSE">South-southeast (SSE)</option>
            <option value="S">South (S)</option>
            <option value="SSW">South-southwest (SSW)</option>
            <option value="SW">SouthWest (SW)</option>
            <option value="WSW">West-southwest (WSW)</option>
            <option value="W">West (W)</option>
            <option value="WNW">West-northwest (WNW)</option>
            <option value="NW">NorthWest (NW)</option>
            <option value="NNW">North-northwest (NNW)</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ecology">
            Ecology
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="ecology" type="text"
            {...register("ecology")}
          />
        </div>
        <div className="mb-4">
          <div className="inline-flex items-center">
            <label className="block text-gray-700 text-sm font-bold mr-4" htmlFor="community_question">
              Community? <span className="text-red-700">*</span>
            </label>
            <div className="form-check form-check-inline inline-flex items-center mr-4">
              <input className="form-check-input form-check-input appearance-none rounded-full mr-2 h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500" type="radio" id="inlineRadioYes" name="community_question" value="Yes"
                {...register("community_question", { required: true })}
                checked={thereIsCommunity}
                onClick={() => setThereIsCommunity(true)}
              />
              <label className="form-check-label inline-block text-gray-700" htmlFor="inlineRadioYes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline inline-flex items-center">
              <input className="form-check-input form-check-input appearance-none rounded-full mr-2 h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500" type="radio" id="inlineRadioNo" name="community_question" value="No"
                {...register("community_question", { required: true })}
                checked={!thereIsCommunity}
                onClick={() => setThereIsCommunity(false)}
              />
              <label className="form-check-label inline-block text-gray-700" htmlFor="inlineRadioNo">
                No
              </label>
            </div>
          </div>
          {errors.community_question?.type === "required" && (
            <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
              You must answer the question
            </p>
          )}
        </div>
        {thereIsCommunity && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="community">
                Community name <span className="text-red-700">*</span>
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="community" type="text"
                {...register("community", { required: thereIsCommunity })}
              />
              {errors.community?.type === "required" && (
                <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                  Community name is required
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="community_year">
                Community year
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="community_year" type="number" step="any"
                {...register("community_year", {
                  min: 0,
                  max: new Date().getFullYear(),
                })}
              />
              {(errors.community_year?.type === "max" ||
                errors.community_year?.type === "min") && (
                <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                  The year entered is invalid
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="community_author_name">
                Community authors
              </label>
              <div className="flex flex-wrap -mx-2 mb-2 items-center">
                <div className="md:w-3/4 px-3 mb-2 md:mb-0">
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="community_author_name" type="text"
                    {...register("community_author_name", {
                      validate: (value) => !value || value === "",
                    })}
                    onChange={(e) => {
                      setCurrentCommunityAuthor(e.target.value);
                      setCommunityAuthorClick(false);
                    }}
                  />
                  {errors.community_author_name?.type === "validate" &&
                    currentCommunityAuthor !== "" && (
                      <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                        You must empty the field or add the community author to the list
                      </p>
                    )}
                  {communityAuthorClick &&
                    communityAuthors.includes(currentCommunityAuthor) && (
                      <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                        The community author is already on the list
                      </p>
                    )}
                </div>
                <div className="md:w-1/4 px-3 mb-2 md:mb-0">
                  <button className="inline-flex items-center justify-center w-7 h-7 text-white duration-150 bg-green-500 transition-colors ease-in-out hover:bg-green-700 rounded-full focus:shadow-outline disabled:opacity-30" type="button"
                    disabled={
                      !currentCommunityAuthor || currentCommunityAuthor === ""
                    }
                    onClick={() => {
                      Functions.addCommunityAuthor(currentCommunityAuthor,communityAuthors,setCommunityAuthors,setCurrentCommunityAuthor,setValue);
                      setCommunityAuthorClick(true);
                    }}
                  >
                    <BiPlus />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap max-w-4xl mb-4">
              {communityAuthors.map((c_author, index) => (
                <span className="flex-initial text-gray-700 font-bold pl-2 pr-2 bg-green-200 rounded mb-2 mr-2" key={index}>
                  <div className="flex space-x-2 items-center">
                    <p className="flex-initial">
                      {c_author}
                    </p>
                    <a className="flex-initial inline-flex items-center justify-center w-4 h-4 ml-2 mr-2 text-white transition-colors duration-150 rounded-full focus:shadow-outline"
                      onClick={() => Functions.removeCommunityAuthor(c_author,communityAuthors,setCommunityAuthors)}
                    >
                      <svg fill="#10B981" viewBox="0 0 24 24" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z" />
                      </svg>
                    </a>
                  </div>
                </span>
              ))}
            </div>
          </>
        )}
        <div className="mb-4">
          <div className="inline-flex items-center">
            <label className="block text-gray-700 text-sm font-bold mr-4" htmlFor="subcommunity_question">
              Sub-community? <span className="text-red-700">*</span>
            </label>
            <div className="form-check form-check-inline inline-flex items-center mr-4">
              <input className="form-check-input form-check-input appearance-none rounded-full mr-2 h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500" type="radio" id="inlineRadioYes" name="subcommunity_question" value="Yes"
                {...register("subcommunity_question", { required: true })}
                checked={thereIsSubcommunity}
                onClick={() => setThereIsSubcommunity(true)}
              />
              <label className="form-check-label inline-block text-gray-700" htmlFor="inlineRadioYes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline inline-flex items-center">
              <input className="form-check-input form-check-input appearance-none rounded-full mr-2 h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500" type="radio" id="inlineRadioNo" name="subcommunity_question" value="No"
                {...register("subcommunity_question", { required: true })}
                checked={!thereIsSubcommunity}
                onClick={() => setThereIsSubcommunity(false)}
              />
              <label className="form-check-label inline-block text-gray-700" htmlFor="inlineRadioNo" >
                No
              </label>
            </div>
          </div>
          {errors.subcommunity_question?.type === "required" && (
            <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
              You must answer the question
            </p>
          )}
        </div>
        {thereIsSubcommunity && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subcommunity">
                Sub-community name <span className="text-red-700">*</span>
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="subcommunity" type="text"
                {...register("subcommunity", { required: thereIsSubcommunity })}
              />
              {errors.subcommunity?.type === "required" && (
                <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                  Subcommunity name is required
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subcommunity_year" >
                Sub-community year
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="subcommunity_year" type="number" step="any"
                {...register("subcommunity_year", {
                  min: 0,
                  max: new Date().getFullYear(),
                })}
              />
              {(errors.subcommunity_year?.type === "max" ||
                errors.subcommunity_year?.type === "min") && (
                <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                  The year entered is invalid
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subcommunity_author_name" >
                Sub-community authors
              </label>
              <div className="flex flex-wrap -mx-2 mb-2 items-center">
                <div className="md:w-3/4 px-3 mb-2 md:mb-0">
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="subcommunity_author_name" type="text"
                    {...register("subcommunity_author_name", {
                      validate: (value) => !value || value === "",
                    })}
                    onChange={(e) => {
                      setCurrentSubcommunityAuthor(e.target.value);
                      setSubcommunityAuthorClick(false);
                    }}
                  />
                  {errors.subcommunity_author_name?.type === "validate" &&
                    currentSubcommunityAuthor !== "" && (
                      <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                        You must empty the field or add the subcommunity author
                        to the list
                      </p>
                    )}
                  {subcommunityAuthorClick &&
                    subcommunityAuthors.includes(currentSubcommunityAuthor) && (
                      <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                        The subcommunity author is already on the list
                      </p>
                    )}
                </div>
                <div className="md:w-1/4 px-3 mb-2 md:mb-0">
                  <button className="inline-flex items-center justify-center w-7 h-7 mr-2 text-white duration-150 bg-green-500 transition-colors ease-in-out hover:bg-green-700 rounded-full focus:shadow-outline disabled:opacity-30" type="button"
                    disabled={
                      !currentSubcommunityAuthor ||
                      currentSubcommunityAuthor === ""
                    }
                    onClick={() => {
                      Functions.addSubcommunityAuthor(currentSubcommunityAuthor,subcommunityAuthors,setSubcommunityAuthors,setCurrentSubcommunityAuthor,setValue);
                      setSubcommunityAuthorClick(true);
                    }}
                  >
                    <BiPlus />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap max-w-4xl mb-4">
              {subcommunityAuthors.map((sa_author, index) => (
                <span className="flex-initial text-gray-700 font-bold pl-2 pr-2 bg-green-200 rounded mb-2 mr-2" key={index}>
                  <div className="flex space-x-2 items-center">
                    <p className="flex-initial">{sa_author}</p>
                    <a className="flex-initial inline-flex items-center justify-center w-4 h-4 ml-2 mr-2 text-white transition-colors duration-150 rounded-full focus:shadow-outline"
                      onClick={() => Functions.removeSubcommunityAuthor(sa_author,subcommunityAuthors,setSubcommunityAuthors)
                        }
                    >
                      <svg fill="#10B981" viewBox="0 0 24 24" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z" />
                      </svg>
                    </a>
                  </div>
                </span>
              ))}
            </div>
          </>
        )}
        <div className="mb-4">
          <label className="block text-green-500 text-lg font-bold mb-4">
            Species
          </label>
        </div>
        <div className="flex flex-nowrap -mx-3">
          <div className="md:w-2/3 px-3 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="species_name" >
              Name <span className="text-red-700">*</span>
            </label>
            <div>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="species_name" type="text" list="species_list"
                {...register("species_name", {
                  validate: (value) =>
                    (!value || value === "") && species.length !== 0,
                })}
                onChange={(e) => {
                  setCurrentSpecies(e.target.value);
                  setSpeciesClick(false);
                }}
              />
              <datalist id="species_list">
                {naturalParkSpecies.map((species, index) => (
                  <option key={index}>{species}</option>
                ))}
              </datalist>
            </div>
          </div>
          <div className="md:w-1/6 px-3 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ind">
              Ind <span className="text-red-700">*</span>
            </label>
            <div>
              <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  id="ind"  defaultValue=""
                {...register("ind", {
                  validate: (value) =>
                    (!value || value === "") && species.length !== 0,
                })}
                onChange={(e) => {
                  setCurrentInd(e.target.value);
                  setSpeciesClick(false);
                }}
              >
                <option value="" disabled hidden />
                <option value="+">+</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className="md:w-1/6 px-3 md:mb-0">
            <button className="inline-flex items-center justify-center w-7 h-7 mt-8 text-white duration-150 bg-green-500 transition-colors ease-in-out hover:bg-green-700 rounded-full focus:shadow-outline disabled:opacity-30" type="button"
              onClick={() => {
                Functions.addSpecies(currentSpecies, currentInd,species,setSpecies,setCurrentSpecies,setCurrentInd,setValue);
                setSpeciesClick(true);
              }}
              disabled={
                !currentSpecies ||
                currentSpecies === "" ||
                !currentInd ||
                currentInd === ""
              }
            >
              <BiPlus />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="md:w-2/3 px-3 md:mb-0">
            {(errors.species_name?.type === "validate" ||
              errors.ind?.type === "validate") &&
              (currentSpecies !== "" || currentInd !== "") &&
              species.length !== 0 && (
                <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                  You must empty the fields or add the species and its ind to
                  the list
                </p>
              )}
            {isSubmitted && species.length == 0 && (
              <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                You must add some species to the list
              </p>
            )}
            {speciesClick &&
              species.findIndex(
                (i) => i.Name === currentSpecies && i.Ind === currentInd
              ) != -1 && (
                <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
                  The species is already listed along with that ind
                </p>
              )}
          </div>
        </div>
        <div className="flex flex-wrap max-w-4xl">
          {species.map((oneSpecies, index) => (
            <span key={index} className="flex-initial text-gray-700 font-bold pl-2 pr-2 bg-green-200 rounded mb-2 mr-2">
              <div className="flex space-x-2 items-center">
                <p className="flex-initial">
                  {oneSpecies.Name}, {oneSpecies.Ind}
                </p>
                <a className="flex-initial inline-flex items-center justify-center w-4 h-4 ml-2 mr-2 text-white transition-colors duration-150 rounded-full focus:shadow-outline"
                  onClick={() => Functions.removeSpecies(oneSpecies,species,setSpecies)}>
                  <svg fill="#10B981" viewBox="0 0 24 24" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z" />
                  </svg>
                </a>
              </div>
            </span>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-green-500 text-lg font-bold mb-4">
            Upload picture
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="picture">
            Picture
          </label>
          <div className="grid justify-center">
            <Dashboard className="max-w-4xl" uppy={uppy} hideUploadButton={true} height={300} width="100vw"/>
          </div>
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
