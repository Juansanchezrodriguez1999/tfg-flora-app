import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Header from "/components/Header";
import Footer from "/components/Footer";
import Table, {
  NumberRangeColumnFilter,
  DefaultColumnFilter,
} from "/components/Table";
import Link from "next/link";
import { useRouter } from "next/router";
import { FloraSamples } from "/lib/FloraSamples";
import { GrAddCircle, GrUpdate } from "react-icons/gr";
import { Time } from "../lib/Time";
import { Functions } from "../components/form-components/Functions";
import { FloraSpecies } from "../lib/FloraSpecies";
import { FloraAuthors } from "../lib/FloraAuthors";



export default function Samples() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [samples, setSamples] = useState([]);
  const [localSamples, setLocalSamples] = useState([]);
  const [showAllSyncButton, setShowAllSyncButton] = useState(false);
  const [syncError, setSyncError] = useState();
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [dropRemoteSuccess, setDropRemoteSuccess] = useState(false);
  const [dropLocalSuccess, setDropLocalSuccess] = useState(false);
  const [offlineMessage, setOfflineMessage] = useState(false);
  const [numLocalDocs, setNumLocalDocs] = useState();
  const [routerQuery, setRouterQuery] = useState();
  const [lastRefresh, setLastRefresh] = useState();

  const updateState = () => {
    setRouterQuery();
    setSyncError();
    setSyncSuccess(false);
    setDropRemoteSuccess(false);
    setDropLocalSuccess(false);
  };

  const clickUpdate = async () => {
    if (navigator.onLine){
      const lastr = await Functions.updateTimesAfterUpdate();
      setLastRefresh(lastr)
      let refresh = "YES"
      await FloraSpecies.getSpecies(refresh);
      FloraAuthors.getUsers(refresh);
    }
    else{
      setOfflineMessage(true);
    }
  };

  const preprocessSamples = (docs) => {
    const res = docs.map((doc) => {
      const date = new Date(doc.created_at);
      const strDate = date.toLocaleString([], {
        dateStyle: "short",
        timeStyle: "short",
      });
      const numSpecies = doc.Species.length;
      return { ...doc, Str_Date: strDate, Num_Species: numSpecies };
    });
    return res;
  };

  const confirmRemove = () => {
    var ans = confirm("Are you sure to remove?");
    if (ans===true) return true;
    else return false
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "Str_Date",
        sortType: "string",
        Filter: DefaultColumnFilter,
      },
      {
        Header: "Nº R.",
        accessor: "_id",
        sortType: "string",
        Filter: DefaultColumnFilter,
      },
      {
        Header: "N.S.",
        accessor: "Num_Species",
        sortType: "number",
        Filter: NumberRangeColumnFilter,
        filter: "between",
      },
      {
        Header: () => null,
        id: "buttons",
        Cell: ({ cell: { row } }) => {
          const isLocal = false;
          let id;
          let viewDir;
          let editDir;
          if (row.original["id"]) {
            isLocal = true;
            id = row.original["id"];
            viewDir = {
              pathname: "/view/local/sample",
              query: { id: id },
            };
            editDir = {
              pathname: "/edit/local/sample",
              query: { id: id },
            };
          } else {
            id = row.original["_id"];
            viewDir = `/view/remote/${id}`;
            editDir = `/edit/remote/${id}`;
          }
          return (
            <div className="flex gap-2">

              
              <Link href={viewDir}>
                <a className="inline-block bg-blue-200 transition-colors ease-in-out hover:bg-blue-400 font-medium px-2 py-0.5 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                  </svg>
                </a>
              </Link>

              {isLocal &&(  
                <Link href={editDir}>
                  <a className="inline-block bg-yellow-200 transition-colors ease-in-out hover:bg-yellow-400 font-medium px-2 py-0.5 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
                    </svg>
                  </a>
                </Link>
              )}

              <button
                className="inline-block bg-red-200 transition-colors ease-in-out hover:bg-red-400 font-medium px-2 py-0.5 rounded-full"
                onClick={() => removeSample(row.original, isLocal)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" />
                </svg>
              </button>
              {isLocal && navigator.onLine && (
                <button
                  className="inline-block bg-purple-200 transition-colors ease-in-out hover:bg-purple-400 font-medium px-2 py-0.5 rounded-full"
                  onClick={() => submitSync(row.original)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z" />
                  </svg>
                </button>
              )}
            </div>
          );
        },
      },
    ],
    [status]
  );

  const setBoxMessage = (type, message) => {
    var color;
    switch (type) {
      case "Error":
        color = "red";
        break;
      case "Warning":
        color = "yellow";
        break;
      case "Message":
        color = "blue";
        break;
      case "Success":
        color = "green";
        break;
    }
    return (
      <div
        className={`text-gray-700 text-sm font-medium bg-${color}-200 rounded-lg p-4 mb-4`}
        role="alert"
      >
        <span className={`font-medium text-${color}-500`}>{type}!</span>{" "}
        {message}
      </div>
    );
  };

  useEffect(async() => {
    const prueba = await Time.getAllTime();
    console.log(prueba.length);
    if(prueba.length>0){
      console.log(prueba)
      setLastRefresh(prueba[0].strDate.toString())
    }
    else{
      setLastRefresh("undefined")
      
    }
    
  }, []);




  useEffect(() => {
    //console.log(hola)
    //console.log(typeof(hola))
    /*const arrayLastTimeRefresh = hola2.map((doc) => doc.strDate)
    console.log(arrayLastTimeRefresh)
    setLastRefresh(arrayLastTimeRefresh[0]);
    console.log(lastRefresh);*/

    if (!navigator.onLine) {
      setOfflineMessage(true);
    }
    setRouterQuery(router.query);
    updateLocalTable();
  }, []);

  useEffect(() => {
    if (status === "authenticated" && navigator.onLine) {
      updateRemoteTable();
    }
  }, [status]);

  const updateRemoteTable = () => {
    FloraSamples.getAllRemoteSamples()
      .then((res) => {
        setSamples(res);
      })
      .catch((e) => console.error(e));
  };

  const updateLocalTable = () => {
    FloraSamples.getAllLocalSamples()
      .then((res) => {
        setLocalSamples(res);
        setNumLocalDocs(res.length);
        if (res.length == 0 || !navigator.onLine) {
          setShowAllSyncButton(false);
        } else {
          setShowAllSyncButton(true);
        }
      })
      .catch((e) => console.error(e));
  };

  const removeSample = (doc, isLocal) => {
    updateState();
    var confirm = confirmRemove();
    if (isLocal && confirm) {
      FloraSamples.removeLocalOne(doc.id)
        .then(() => {
          updateLocalTable();
          setDropLocalSuccess(true);
        })
        .catch((e) => console.error(e));
    } else if (confirm){
      FloraSamples.removeRemoteSample(doc)
        .then(() => {
          updateRemoteTable();
          setDropRemoteSuccess(true);
        })
        .catch((e) => console.error(e));
    }
  };

  const submitSync = async (doc) => {
    updateState();
    let sync;
    if (doc === undefined) sync = FloraSamples.syncAll(session.user.username);
    else sync = FloraSamples.syncOne(doc, session.user.username);

    sync
      .then(() => {
        setSyncSuccess(true);
        setSyncError();
      })
      .catch((e) => {
        setSyncError(e.message);
        setSyncSuccess(false);
      }).then(() => {
        updateRemoteTable();
        updateLocalTable();
      });
  };

  if (status === "authenticated") {
    return (
      <div className="mx-auto grid place-items-center">
        <Header />
        <div className="max-w-4xl mt-4 mb-2 bg-green shadow-md rounded px-8 pt-6 pb-8 w-full overflow-x-auto ">
          <div className="grid place-items-center mb-6">
            {routerQuery?.success === "naturalParkAdded" &&
              setBoxMessage(
                "Success",
                "The Natural Site has been correctly stored in the local repository."
              )}
            {routerQuery?.success === "true" &&
              setBoxMessage(
                "Success",
                "The sample has been correctly stored in the remote repository."
              )}
            {routerQuery?.success === "false" &&
              routerQuery?.code === "EDI" &&
              setBoxMessage(
                "Error",
                "Error during insertion in the local database, try again."
              )}
            {routerQuery?.success === "false" &&
              routerQuery?.code === "EDU" &&
              setBoxMessage(
                "Error",
                "Error during update in the local database, try again."
              )}
            {routerQuery?.success === "false" && routerQuery?.code === "LOC" && (
              <div>
                {" "}
                {setBoxMessage(
                  "Warning",
                  "The collected data is currently in a local database due to its lack of connection."
                )}{" "}
                {setBoxMessage(
                  "Message",
                  `You can continue collecting samples offline without any problem. Total local samples: ${numLocalDocs}.`
                )}{" "}
              </div>
            )}
            {routerQuery?.success === "false" &&
              routerQuery?.code === "EDS" &&
              setBoxMessage(
                "Warning",
                "The collected data is currently in a local database due to an error during synchronization between it and the remote one."
              )}
            {syncError && (
              <div>
                {" "}
                {setBoxMessage(
                  "Error",
                  `${syncError}`
                )}{" "}
                {setBoxMessage(
                  "Message",
                  "Don't worry, your data is still stored in the local database."
                )}{" "}
              </div>
            )}
            {syncSuccess &&
              setBoxMessage(
                "Success",
                "Data has been correctly synchronized with the remote database."
              )}
            {dropRemoteSuccess &&
              setBoxMessage(
                "Success",
                "The sample has been successfully removed from the remote database."
              )}
            {dropLocalSuccess &&
              setBoxMessage(
                "Success",
                "The sample has been successfully removed from the local database."
              )}
            {(syncSuccess || dropLocalSuccess) &&
              numLocalDocs == 0 &&
              setBoxMessage(
                "Message",
                "No sample pending, so the local database has been cleaned up."
              )}
            {offlineMessage &&
              !routerQuery?.success &&
              setBoxMessage(
                "Warning",
                "You have no internet connection,  you can not update local database but you can continue collecting samples and they will be stored in the local database."
              )}
            {numLocalDocs > 0 &&
              navigator.onLine &&
              !syncError &&
              (!routerQuery?.code || routerQuery?.code !== "EDS") &&
              setBoxMessage(
                "Warning",
                `You have ${numLocalDocs} samples pending to be synchronized.`
              )}

            <div className="flex gap-2">
              <Link href="/form">
                <a className="bg-green-200 transition-colors ease-in-out hover:bg-green-400 py-2 px-2 rounded">
                  <div className="flex items-center justify-center space-x-2">
                    <GrAddCircle />
                    <span>Add sample</span>
                  </div>
                </a>
              </Link>
              <Link href="/form_np">
                <a className="bg-pink-200 transition-colors ease-in-out hover:bg-pink-400 py-2 px-2 rounded">
                  <div className="flex items-center justify-center space-x-2">
                    <GrAddCircle />
                    <span>Add Natural Site</span>
                  </div>
                </a>
              </Link>
            </div>
          </div>
          {localSamples.length > 0 && (
            <div>
              <div className="mb-4">
                <label className="block text-green-500 text-lg font-bold mb-4">
                  Local samples
                </label>
              </div>
              {showAllSyncButton && (
                <div className="grid place-items-center mb-2">
                  <button
                    className="bg-purple-200 transition-colors ease-in-out hover:bg-purple-400 py-2 px-2 rounded mb-5"
                    onClick={() => submitSync()}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z" />
                      </svg>
                      <span>Sync All</span>
                    </div>
                  </button>
                </div>
              )}
              <Table columns={columns} data={preprocessSamples(localSamples)} />
            </div>
          )}
          {navigator.onLine && samples.length > 0 && (
            <div>
              <div className="mb-4">
                <label className="block text-green-500 text-lg font-bold mb-4">
                  Remote samples
                </label>
              </div>
              <Table columns={columns} data={preprocessSamples(samples)} />
            </div>
          )}
        </div>
        
        <div className="flex gap-2 mb-2">
              {lastRefresh !== "undefined" && (
                  <div className="flex items-center justify-center space-x-2 mr-2">
                    Local database update: &nbsp;  
                    {lastRefresh}
                  </div>
                )}
                {lastRefresh == "undefined" && (
                  <div className="flex items-center justify-center space-x-2 mr-2">
                    The local database has never been updated
                  </div>
                )}
              { navigator.onLine && (
              <button
                        className=""
                        type="button"
                        onClick={async() =>{clickUpdate().then(() => {
                          router.push({
                            pathname: "/samples",
                          });
                        })
                        .catch((e) => {
                          router.push({
                            pathname: "/samples",
                            query: { success: false, code: e.message },
                          });
                        }); }
                                }      
                      >
                        <div className="flex items-center justify-center space-x-2 font-bold text-green-500 hover:text-green-800">
                        <GrUpdate className/> <span> Update local database</span>
                        </div>
              </button>
              )}

        </div>
        <Footer />
      </div>
      
    );
  } else if (status === "loading") {
    return null;
  } else {
    router.push("/signin");
    return null;
  }
}
