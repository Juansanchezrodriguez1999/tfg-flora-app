import Dexie from "dexie";

const localStorage = new Dexie("Authors");
localStorage.version(1).stores({
  authors: "++id, username, fullname",
});

const getRemoteUsers = () => {
  // return new Promise(() => {throw new Error()})

  return fetch(`/services/flora/app/api/authors`)
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

const updateLocalUsers = () => {
  return getRemoteUsers()
    .then(async (reg_authors) => {
      await localStorage.authors
        .clear()
        .then(() => localStorage.authors.bulkAdd(reg_authors));
    })
    .catch((err) => {
      console.warn(err);
    });
};

const FloraAuthors = {
  getUsers: (refreshYesNo) => {
    if (navigator.onLine && refreshYesNo==="YES") {
      return updateLocalUsers().then(() => localStorage.authors.toArray());
    } else {
      return localStorage.authors.toArray();
    }
  },
};

export { FloraAuthors };
