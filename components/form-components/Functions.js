import Mgrs, {LatLon} from "geodesy/mgrs.js";
import { FloraSamples } from "../../lib/FloraSamples";
import { FloraAuthors } from "../../lib/FloraAuthors";
import { FloraSpecies } from "../../lib/FloraSpecies";
import { Time } from "../../lib/Time";

const Functions = {
  //No Register and useEffect
  getRemoteRegisNumbers: async (setRemoteRegisNumbers) => {
    if (navigator.onLine){
      const remoteRNs = await FloraSamples.getAllRemoteRegisNumber();
    setRemoteRegisNumbers(remoteRNs);
    }
  },
  getLocalRegisNumbers: async (setLocalRegisNumbers,isLocal,sample) => {
    console.log(sample)
    if (!isLocal) {
      const localRNs = await FloraSamples.getAllLocalRegisNumber();
      if(sample!=undefined){
        const RNsFilt = localRNs.filter(rns=>rns!=sample._id);
        setLocalRegisNumbers(RNsFilt);
        console.log("estamos en edit hay sample")
      }else{
        setLocalRegisNumbers(localRNs);
        console.log("no hay sample")
      }
    } else {
        const localRNs = await FloraSamples.getAllLocalRegisNumber();
        if(sample!=undefined){
          const RNsFilt = localRNs.filter(rns=>rns!=sample._id);
          setLocalRegisNumbers(RNsFilt);
          console.log("estamos en edit hay sample")
        }else{
          setLocalRegisNumbers(localRNs);
          console.log("no hay sample")
        }
    }
  },
  //Author
  addAuthor (currentAuthor,authors,setAuthors,setCurrentAuthor,setValue) {
    if (
      currentAuthor &&
      currentAuthor !== "" &&
      !authors.includes(currentAuthor)
    ) {
      setAuthors([...authors, currentAuthor]);
      setCurrentAuthor("");
      setValue("author_name", "");
    }
  },
  removeAuthor (author,Authors,setAuthors) {
    const items =Authors.filter((value) => value !== author);

    setAuthors(items);
  },
  //Natural Park
  getSpecies: async (np,allSpecies,setNaturalParkSpecies ) => {
    if (allSpecies.map((d) => d._id).includes(np)) {
      const np_doc = allSpecies.find((d) => d._id === np);
      console.log("adios")
      console.log(np_doc)
      const np_species = np_doc.Species.map((s) => s);
      const unique_np_species = [...new Set(np_species)];
      setNaturalParkSpecies(unique_np_species);
      console.log(unique_np_species)
    } else {
      console.log("hola")
      setNaturalParkSpecies([]);
    }
  },
  //Georeferencing
  getCoordinates (mode,setUTM,setLatitude,setLongitude,setValue) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude.toFixed(7);
        var lon = position.coords.longitude.toFixed(7);
        if (mode === "utm") {
            var utmf = Functions.getUTMFromCoordinates(lat, lon);
            setUTM(utmf);
            setValue("utm", utmf);
        } else if (mode === "latlon") {
            setLatitude(lat);
            setLongitude(lon);
            setValue("latitude", lat);
            setValue("longitude", lon);
        }
    })
  },
  getUTMFromCoordinates (lat, lon) {
    var latlon = new LatLon(lat, lon);
    var utm = latlon.toUtm().toMgrs().toString(4);
    return utm;
  },
  getCoordinatesFromUTM (utm) {
    var mgrs = Mgrs.parse(utm)
    var latlon = mgrs.toUtm().toLatLon();
    return [latlon.latitude, latlon.longitude]
  },
  validateUTM (value) {
    if (!value || value === "") return true;

    var vector = value.split(" ");
    var lengths = vector.map((str) => str.length);
    if ([3, 2, 2, 2].toString() !== lengths.toString()) return false;

    var num = parseInt(vector[0].substring(0, 2));
    var letter = vector[0].substring(2);
    if (num < 1 || num > 60 || !letter.match(/[C-N]|[O-X]/)) return false;

    var matches = vector[1].match(/[A-H]|[J-N]|[P-Z]/g);
    if (!matches || matches.length !== 2) return false;

    return true;
  },
  //Community Authors
  addCommunityAuthor (currentCommunityAuthor,communityAuthors,setCommunityAuthors,setCurrentCommunityAuthor,setValue) {
    if (
      currentCommunityAuthor &&
      currentCommunityAuthor !== "" &&
      !communityAuthors.includes(currentCommunityAuthor)
    ) {
      setCommunityAuthors([...communityAuthors, currentCommunityAuthor]);
      setCurrentCommunityAuthor("");
      setValue("community_author_name", "");
    }
  },
  removeCommunityAuthor (c_author,communityAuthors,setCommunityAuthors) {
    const items = communityAuthors.filter((value) => value !== c_author);
    setCommunityAuthors(items);
  },
  //Subcommunity Authors
  addSubcommunityAuthor(currentSubcommunityAuthor,subcommunityAuthors,setSubcommunityAuthors,setCurrentSubcommunityAuthor,setValue) {
    if (
      currentSubcommunityAuthor &&
      currentSubcommunityAuthor !== "" &&
      !subcommunityAuthors.includes(currentSubcommunityAuthor)
    ) {
      setSubcommunityAuthors([
        ...subcommunityAuthors,
        currentSubcommunityAuthor,
      ]);
      setCurrentSubcommunityAuthor("");
      setValue("subcommunity_author_name", "");
    }
  },
  removeSubcommunityAuthor (sa_author,subcommunityAuthors,setSubcommunityAuthors) {
    const items = subcommunityAuthors.filter((value) => value !== sa_author);
    setSubcommunityAuthors(items);
  },
  //Species
  addSpecies(currentSpecies,currentInd,species,setSpecies,setCurrentSpecies,setCurrentInd,setValue) {
    if (
        currentSpecies &&
        currentInd &&
        currentSpecies !== "" &&
        currentInd !== "" &&
        species.findIndex(
        (i) => i.Name === currentSpecies && i.Ind === currentInd
        ) == -1
    ) {
        setSpecies([...species, { Name: currentSpecies, Ind: currentInd }]);
        setCurrentSpecies("");
        setCurrentInd("");
        setValue("species_name", "");
        setValue("ind", "");
    }
  },
  removeSpecies (oneSpecies,species,setSpecies) {
    const items = species.filter(
      (value) => value.Name !== oneSpecies.Name || value.Ind !== oneSpecies.Ind
    );
    setSpecies(items);
  },
  //useEffect
  getAllSpecies: async (setAllSpecies, refresh) => {
    const registered_species = await FloraSpecies.getSpecies(refresh);
    setAllSpecies(registered_species);
  },
  getAuthors: async (setStaticAuthors,setUsernames,refresh) => {
    const registered_authors = await FloraAuthors.getUsers(refresh);
    setStaticAuthors(registered_authors);
    setUsernames(registered_authors.map((d) => d.username));
  },

  getRefreshLocalDatabase: async () => {

    const allTimesArray = await Time.getAllTime();
    console.log(allTimesArray)
    console.log("timenuevo")
    console.log(allTimesArray[(allTimesArray.length)-1])
    if (allTimesArray.length>1){
      console.log("timeviejo")
      console.log(allTimesArray[(allTimesArray.length)-2])
      if (allTimesArray[(allTimesArray.length)-1]-allTimesArray[(allTimesArray.length)-2]>10){
        console.log(console.log(allTimesArray[(allTimesArray.length)-1],"-",allTimesArray[(allTimesArray.length)-2])," = ",allTimesArray[(allTimesArray.length)-1]-allTimesArray[(allTimesArray.length)-2])
        Time.removeTime(allTimesArray[(allTimesArray.length)-2]);
        var update = "YES"
      }
      else{
        console.log(console.log(allTimesArray[(allTimesArray.length)-1],"-",allTimesArray[(allTimesArray.length)-2])," = ",allTimesArray[(allTimesArray.length)-1]-allTimesArray[(allTimesArray.length)-2])
        Time.removeTime(allTimesArray[(allTimesArray.length)-1]);
        var update = "NO"
      }
    }
    else{
      var update = "YES"
    }
    Time.insertTime();
    return update;
  }
        /*if(allTimesArray[(allTimesArray.length)-1]-allTimesArray[(allTimesArray.length)-2]>10){
          Time.removeTime(allTimesArray[(allTimesArray.length)-2]);
          
        }
        const lastTime = allTimesArray[(allTimesArray.length)-2]
        const currentTime = allTimesArray[(allTimesArray.length)-1]
        setCurrentDateTime(currentTime);
        setLastDateTime(lastTime)
        console.log(allTimesArray)
      
      else{
        Time.insertTime();
        console.log("primer time")
      }
  }

  getCurrentDate(setCurrentDate,currentDate){
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hour = newDate.getHours();
    let minutes = newDate.getMinutes();
    let seconds = newDate.getSeconds();
    console.log(currentDate)
    var dateTime = (new Date(`${year}/${month<10?`0${month}`:`${month}`}/${date} ${hour}:${minutes<10?`0${minutes}`:`${minutes}`}:${seconds<10?`0${seconds}`:`${seconds}`}` ))/60000;
    setCurrentDate(dateTime)
    console.log(currentDate)
    if(currentDate="undefined"){
      setCurrentDate(dateTime)
      console.log("primer datetime")
    }
    else if (dateTime-currentDate>10){
      console.log("hay que refrescar")
    }
    else{
      console.log("no refresco")
    }
    },

    loadFiles(currentDate,setCurrentDate,setLoadFiles){
      let newDate = new Date()
      let date = newDate.getDate();
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear();
      let hour = newDate.getHours();
      let minutes = newDate.getMinutes();
      let seconds = newDate.getSeconds();
      var dateTimeNew = (new Date(`${year}/${month<10?`0${month}`:`${month}`}/${date} ${hour}:${minutes<10?`0${minutes}`:`${minutes}`}:${seconds<10?`0${seconds}`:`${seconds}`}` ))/60000;
      if (dateTimeNew-currentDate>10){
        setLoadFiles("Y");
      }
      else {
        setLoadFiles("N")
      }
      setCurrentDate(dateTime)
      },


    getCurfffrentDate(currentDate,setCurrentDate){
      let newDate = new Date()
      let date = newDate.getDate();
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear();
      let hour = newDate.getHours();
      let minutes = newDate.getMinutes();
      let seconds = newDate.getSeconds();
      var x = (new Date(`${year}/${month<10?`0${month}`:`${month}`}/${date} ${hour}:${minutes<10?`0${minutes}`:`${minutes}`}:${seconds<10?`0${seconds}`:`${seconds}`}` ))/60000;
      var y = (new Date('2022/11/29 13:10:00'))/60000;
      setCurrentDate([x-y])
    }*/
}
export {Functions};