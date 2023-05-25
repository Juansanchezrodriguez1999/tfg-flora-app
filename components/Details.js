// import Map from "./Map";

import { useState, useEffect } from "react";
import { FloraSamples } from "/lib/FloraSamples";

export default function Details({ sample, isLocal }) {
  const [pictures, setPictures] = useState([]);
  const dict = {
    N: "North",
    S: "South",
    E: "East",
    W: "West",
    NW: "NorthWest",
    NE: "NorthEast",
    SW: "SouthWest",
    SE: "SouthEast",
  };

  useEffect(() => {
    if (!isLocal) {
      FloraSamples.getPictures(sample.Pictures).then((urls) =>
        setPictures(urls)
      );
    } else {
      var urls = sample.Pictures.map((img) => URL.createObjectURL(img.data));
      setPictures(urls);
    }
  }, []);

  return (
    <>
      <title>Details</title>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 m-4 items-center max-w-6xl">
        <div className="max-w-sm min-h-full rounded shadow-lg items-center place-items-center">
          <div>
            <div className="items-center justify-center grid place-items-center m-2 flex text-sm w-full">

              <label className="block flex text-green-500 gap-2 text-lg font-bold mb-3">
                < span><svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="ruler"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="#16a34a"
                    d="M528 32H48C21.5 32 0 53.5 0 80v16h576V80c0-26.5-21.5-48-48-48zM0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V128H0v304zm352-232c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16zm0 64c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16zm0 64c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16zM176 192c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zM67.1 396.2C75.5 370.5 99.6 352 128 352h8.2c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h8.2c28.4 0 52.5 18.5 60.9 44.2 3.2 9.9-5.2 19.8-15.6 19.8H82.7c-10.4 0-18.8-10-15.6-19.8z"
                  ></path>
                </svg>     </span>
                Identification
              </label>
              <ul className="list-none">
                <li className="flex gap-2">
                  <p className="text-gray-700 font-bold">Nº Register:</p>
                  <span className="text-gray-700 font-medium pl-2 pr-2 bg-green-200 rounded-full">
                    {sample._id}
                  </span>
                </li>
                <li className="flex gap-2">
                  <p className="text-gray-700 font-bold">Group:</p>
                  {sample.Group}
                </li>
                <li className="flex gap-2">
                  <p className="text-gray-700 font-bold">Project:</p>
                  {sample.Project}
                </li>
                <li className="flex flex-wrap gap-2">
                  <p className="text-gray-700 font-bold">Authors:</p>
                  <div className="flex flex-wrap">
                    {sample.Authors.map((author, index) => (
                      <span
                        key={index}
                        className="flex-initial text-gray-700 font-medium pl-2 pr-2 bg-green-200 rounded-full mb-2 mr-2"
                      >
                        <p>{author}</p>
                      </span>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-sm min-h-full rounded shadow-lg items-center place-items-center">
          <div className="items-center justify-center grid place-items-center">
            <label className="block flex text-green-500 gap-2 text-lg font-bold mt-3 mb-3">
              < span><svg
                className="w-6 h-6"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="ruler"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  fill="#16a34a"
                  d="M64 96H0c0 123.7 100.3 224 224 224v144c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320C288 196.3 187.7 96 64 96zm384-64c-84.2 0-157.4 46.5-195.7 115.2 27.7 30.2 48.2 66.9 59 107.6C424 243.1 512 147.9 512 32h-64z"
                ></path>
              </svg>     </span>
              Species
            </label>
            <div className="flex flex-wrap place-items-center grid">
              {sample.Species.map((oneSpecies, index) => (
                <span
                  key={index}
                  className="flex-initial text-gray-700 font-medium pl-2 pr-2 bg-green-200 rounded-full mb-2 mr-2"
                >
                  <p>
                    {oneSpecies.Name}, {oneSpecies.Ind}
                  </p>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-sm min-h-full rounded shadow-lg">
          <div className="items-center justify-center grid place-items-center mb-4 ml-4 mr-4">

            <label className="block flex text-green-500 gap-2 text-lg font-bold mt-3 mb-3">
              < span><svg
                className="w-6 h-6"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="ruler"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  fill="#16a34a"
                  d="M288 0c-69.59 0-126 56.41-126 126 0 56.26 82.35 158.8 113.9 196.02 6.39 7.54 17.82 7.54 24.2 0C331.65 284.8 414 182.26 414 126 414 56.41 357.59 0 288 0zm0 168c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42zM20.12 215.95A32.006 32.006 0 0 0 0 245.66v250.32c0 11.32 11.43 19.06 21.94 14.86L160 448V214.92c-8.84-15.98-16.07-31.54-21.25-46.42L20.12 215.95zM288 359.67c-14.07 0-27.38-6.18-36.51-16.96-19.66-23.2-40.57-49.62-59.49-76.72v182l192 64V266c-18.92 27.09-39.82 53.52-59.49 76.72-9.13 10.77-22.44 16.95-36.51 16.95zm266.06-198.51L416 224v288l139.88-55.95A31.996 31.996 0 0 0 576 426.34V176.02c0-11.32-11.43-19.06-21.94-14.86z"
                ></path>
              </svg>     </span>
              Location
            </label>
            <ul className="list-none">
              <li className="flex gap-2">
                <p className="text-gray-700 font-bold">UTM:</p>
                <span className="text-gray-700 font-medium pl-2 pr-2 bg-green-200 rounded-full">
                  {sample.UTM}
                </span>
              </li>
              <li className="flex gap-2">
                <p className="text-gray-700 font-bold">Location:</p>
                {sample.Location}
              </li>
              <li className="flex gap-2">
                <p className="text-gray-700 font-bold">Natural site:</p>
                {sample.Natural_Park}
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-sm min-h-full rounded shadow-lg  lg:col-span-2 lg:max-w-full row-span-2 lg:row-span-1 xl:row-span-1">
          <div className="items-center justify-center grid place-items-center flex text-sm w-full">

            <label className="block flex text-green-500 gap-2 text-lg font-bold m-2">
              < span><svg
                className="w-6 h-6"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="ruler"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  fill="#16a34a"
                  d="M635.7 167.2L556.1 31.7c-8.8-15-28.3-20.1-43.5-11.5l-69 39.1L503.3 161c2.2 3.8.9 8.5-2.9 10.7l-13.8 7.8c-3.8 2.2-8.7.9-10.9-2.9L416 75l-55.2 31.3 27.9 47.4c2.2 3.8.9 8.5-2.9 10.7l-13.8 7.8c-3.8 2.2-8.7.9-10.9-2.9L333.2 122 278 153.3 337.8 255c2.2 3.7.9 8.5-2.9 10.7l-13.8 7.8c-3.8 2.2-8.7.9-10.9-2.9l-59.7-101.7-55.2 31.3 27.9 47.4c2.2 3.8.9 8.5-2.9 10.7l-13.8 7.8c-3.8 2.2-8.7.9-10.9-2.9l-27.9-47.5-55.2 31.3 59.7 101.7c2.2 3.7.9 8.5-2.9 10.7l-13.8 7.8c-3.8 2.2-8.7.9-10.9-2.9L84.9 262.9l-69 39.1C.7 310.7-4.6 329.8 4.2 344.8l79.6 135.6c8.8 15 28.3 20.1 43.5 11.5L624.1 210c15.2-8.6 20.4-27.8 11.6-42.8z"
                ></path>
              </svg>     </span>
              Biotope and plant community data
            </label>

            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 ml-6 mr-6 mb-6">
              <ul className="list-none">
                <li className="flex gap-2">
                  <p className="text-gray-700 font-bold">Lithology:</p>
                  {sample.Lithology}
                </li>
                <li className="flex gap-2">
                  <p className="text-gray-700 font-bold">Coverage:</p>
                  {sample.Coverage && <>{sample.Coverage}%</>}
                </li>
                <li className="flex gap-2">
                  <p className="text-gray-700 font-bold">Altitude:</p>
                  {sample.Altitude && <>{sample.Altitude}m</>}
                </li>
                <li className="flex gap-2">
                  <p className="text-gray-700 font-bold">Plot_Slope:</p>
                  {sample.Plot_Slope && <>{sample.Plot_Slope}º</>}
                </li>
                <li className="flex gap-2">
                  <p className="text-gray-700 font-bold">Alt_Veg:</p>
                  {sample.Alt_Veg && <>{sample.Alt_Veg}cm</>}
                </li>
                <li className="flex gap-2">
                  <p className="text-gray-700 font-bold">Plot_Area:</p>
                  {sample.Plot_Area && (
                    <>
                      <p>
                        {sample.Plot_Area}m<sup>2</sup>
                      </p>
                    </>
                  )}
                </li>
                <li className="flex gap-2">
                  <p className="text-gray-700 font-bold">Plot_Orientation:</p>
                  {sample.Plot_Orientation && (
                    <>
                      {dict[sample.Plot_Orientation]} (
                      {sample.Plot_Orientation})
                    </>
                  )}
                </li>
                <li className="flex gap-2">
                  <p className="text-gray-700 font-bold">Ecology:</p>
                  {sample.Ecology}
                </li>
              </ul>
              <ul className="list-none">
                <li className="flex gap-2">
                  <p className="text-gray-700 font-bold">Community name:</p>
                  {sample.Community}
                </li>
                <li className="flex gap-2">
                  <p className="text-gray-700 font-bold">Community year:</p>
                  {sample.Community_Year}
                </li>
                <li className="flex flex-wrap gap-2">
                  <p className="text-gray-700 font-bold">
                    Community authors:
                  </p>
                  <div className="flex flex-wrap">
                    {sample.Community_Authors.map((c_author, index) => (
                      <span
                        key={index}
                        className="flex-initial text-gray-700 font-medium pl-2 pr-2 bg-green-200 rounded-full mb-2 mr-2"
                      >
                        <p>{c_author}</p>
                      </span>
                    ))}
                  </div>
                </li>
                <li className="flex gap-2">
                  <p className="text-gray-700 font-bold">
                    Subcommunity name:
                  </p>
                  {sample.Subcommunity}
                </li>
                <li className="flex gap-2">
                  <p className="text-gray-700 font-bold">
                    Subcommunity year:
                  </p>
                  {sample.Subcommunity_Year}
                </li>
                <li className="flex flex-wrap gap-2">
                  <p className="text-gray-700 font-bold">
                    Subcommunity authors:
                  </p>
                  <div className="flex flex-wrap">
                    {sample.Subcommunity_Authors.map((sc_author, index) => (
                      <span
                        key={index}
                        className="flex-initial text-gray-700 font-medium pl-2 pr-2 bg-green-200 rounded-full mb-2 mr-2"
                      >
                        <p>{sc_author}</p>
                      </span>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-sm min-h-full rounded shadow-lg">
          <div className="items-center justify-center grid place-items-center m-2 flex text-sm w-6/7">
            <label className="block flex text-green-500 gap-2 text-lg font-bold mb-1">
              <span> <svg
                className="w-6 h-6 "
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="map-marked-alt"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="#16a34a"
                  d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v208c0 44.112 35.888 80 80 80h336zm96-80V80c0-26.51-21.49-48-48-48H144c-26.51 0-48 21.49-48 48v256c0 26.51 21.49 48 48 48h384c26.51 0 48-21.49 48-48zM256 128c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-96 144l55.515-55.515c4.686-4.686 12.284-4.686 16.971 0L272 256l135.515-135.515c4.686-4.686 12.284-4.686 16.971 0L512 208v112H160v-48z"
                ></path>              </svg></span>
              Pictures
            </label>

            {pictures.length > 0 && (
              <div className="overflow-y-auto lg:max-h-60 xl:max-h-60 m-2">
                {pictures.map((url, index) => (
                  <div key={index}>
                    <img src={url} alt="image" className="max-h-60 " />
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
