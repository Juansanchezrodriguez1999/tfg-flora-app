import Mgrs, {LatLon} from "geodesy/mgrs.js";
import { FloraSamples } from "../../lib/FloraSamples";
import { FloraAuthors } from "../../lib/FloraAuthors";
import { FloraSpecies } from "../../lib/FloraSpecies";

const Functions = {
  //No Register and useEffect
  getRemoteRegisNumbers: async (setRemoteRegisNumbers) => {
    const remoteRNs = await FloraSamples.getAllRemoteRegisNumber();
    setRemoteRegisNumbers(remoteRNs);
  },
  getLocalRegisNumbers: async (setLocalRegisNumbers,isLocal,sample) => {
    if (!isLocal) {
        const localRNs = await FloraSamples.getAllLocalRegisNumber();
        setLocalRegisNumbers(localRNs);
    } else {
        const localRNs = await FloraSamples.getAllLocalRegisNumber()
        const localRNs_Filtered = localRNs.filter(item => item != sample._id)
      setLocalRegisNumbers(localRNs_Filtered);
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
    if (allSpecies.map((d) => d.Natural_Park).includes(np)) {
      const np_doc = allSpecies.find((d) => d.Natural_Park === np);
      const np_species = np_doc.Species.map((s) => s.Taxon);
      setNaturalParkSpecies(np_species);
    } else {
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
  getAllSpecies: async (setAllSpecies) => {
    const registered_species = await FloraSpecies.getSpecies();
    setAllSpecies(registered_species);
  },
  getAuthors: async (setStaticAuthors,setUsernames) => {
    const registered_authors = await FloraAuthors.getUsers();
    setStaticAuthors(registered_authors);
    setUsernames(registered_authors.map((d) => d.username));
  },
}
export {Functions};