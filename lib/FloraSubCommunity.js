import Dexie from "dexie";

const localStorage = new Dexie("Subcommunity");
localStorage.version(1).stores({
  subcommunities: "_id, *Subcommunity",
});

const getRemoteSubcommunities = () => {
  // return new Promise(() => {throw new Error()})

  return fetch(`/services/flora/app/api/subcommunity`)
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

const updateLocalSubcommunities = () => {
  return getRemoteSubcommunities()
    .then(async (reg_subcommunities) => {
      await localStorage.subcommunities
        .clear()
        .then(() => localStorage.subcommunities.bulkAdd(reg_subcommunities));
    })
    .catch((err) => {
      console.warn(err);
    });
};

const FloraSubcommunity = {
  getSubcommunities: (refreshYesNo) => {
    if (navigator.onLine && refreshYesNo === true) {
      return updateLocalSubcommunities().then(() => localStorage.subcommunities.toArray());
    } else {
      return localStorage.subcommunities.toArray();
    }
  },
  insertLocalOne: (object) => {
    const dataObject = {
      _id: object,
      Subcommunities: [""],
    };
    return localStorage.subcommunities.put(dataObject);
  },
};

export { FloraSubcommunity };
