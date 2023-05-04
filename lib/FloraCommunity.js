import Dexie from "dexie";

const localStorage = new Dexie("Community");
localStorage.version(1).stores({
  communities: "_id, *Community",
});

const getRemoteCommunities = () => {
  // return new Promise(() => {throw new Error()})

  return fetch(`/services/flora/app/api/community`)
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

const updateLocalCommunities = () => {
  return getRemoteCommunities()
    .then(async (reg_communities) => {
      await localStorage.communities
        .clear()
        .then(() => localStorage.communities.bulkAdd(reg_communities));
    })
    .catch((err) => {
      console.warn(err);
    });
};

const FloraCommunity = {
  getCommunities: (refreshYesNo) => {
    if (navigator.onLine && refreshYesNo === true) {
      return updateLocalCommunities().then(() => localStorage.communities.toArray());
    } else {
      return localStorage.communities.toArray();
    }
  },
  insertLocalOne: (object) => {
    const dataObject = {
      _id: object,
      Communities: [""],
    };
    return localStorage.communities.put(dataObject);
  },
};

export { FloraCommunity };
