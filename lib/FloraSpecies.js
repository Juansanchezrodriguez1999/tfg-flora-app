import Dexie from "dexie";

const localStorage = new Dexie("Species");
localStorage.version(1).stores({
  species: "_id, *Species"
});

const getRemoteSpecies = () => {
  // return new Promise(() => {throw new Error()})

  return fetch(`/services/flora/app/api/species`)
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        const error = new Error(response.statusText);
        error.response = response;
        return error;
      }
    })
    .then((response) =>
      response instanceof Error ? response : response.json()
    )
    .then((result) => JSON.parse(result.body))
    .catch((err) => {
      throw new Error(err);
    });
};

const updateLocalSpecies = () => {
  return getRemoteSpecies()
    .then(async (reg_species) => {
      await localStorage.species
        .clear()
        .then(() => localStorage.species.bulkAdd(reg_species));
    })
    .catch((err) => {
      console.warn(err);
    });
};

const FloraSpecies = {
  getSpecies: (refreshYesNo) => {
    console.log(refreshYesNo)
    if (navigator.onLine && refreshYesNo==="YES") {
      console.log("Voy a actualizar la base de datos de especies")
      return updateLocalSpecies().then(() => localStorage.species.toArray());
    } else {
      console.log("No voy a actualizar la base de datos de especies")
      return localStorage.species.toArray();
    }
  },
};

export { FloraSpecies };
