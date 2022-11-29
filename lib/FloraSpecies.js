import Dexie from "dexie";

const localStorage = new Dexie("Species");
localStorage.version(1).stores({
  species: "++id, Natural_Park, *Species",
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
  getSpecies: () => {
    if (navigator.onLine) {
      return updateLocalSpecies().then(() => localStorage.species.toArray());
    } else {
      return localStorage.species.toArray();
    }
  },
};

export { FloraSpecies };
