import Dexie from "dexie";

const localStorage = new Dexie("Flora");
localStorage.version(1).stores({
  samples:
    "id, No_Register, Date, *Authors, Group, Project, Location, Natural_Site, UTM, Latitude, Longitude, Lithology, Coverage, Altitude, Plot_Slope, Alt_Veg, Plot_Area, Plot_Orientation, Ecology, Community, Community_Year, *Community_Authors, Subcommunity, Subcommunity_Year, *Subcommunity_Authors, *Species, *Pictures, RemoteIdToUpdate, *PicturesToRemove",
});

const retrieveNewURL = (file, no_reg, cb) => {
  return fetch(`/services/flora/app/api/pictures/${no_reg}/${file.name}`, {
    method: "PUT",
  })
    .then((response) => {
      response.text().then((url) => {
        cb(file, url);
      });
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
};

const uploadFile = (file, url) => {
  return fetch(url, {
    method: "PUT",
    body: file,
  }).catch((e) => {
    console.error(e);
    throw e;
  });
};

const removeRemotePictures = (pictures) => {
  var picturesPromises = pictures.map((minioURL) => {
    const vector = minioURL.split("/").reverse();
    const filename = vector[0];
    const no_reg = vector[2];
    return fetch(`/services/flora/app/api/pictures/${no_reg}/${filename}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        return response;
      } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw new Error(error);
      }
    });
  });
  return Promise.all(picturesPromises);
};

const getAllRemoteRNs = () => {
  return fetch(`/services/flora/app/api/regisnumber`)
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

const syncDoc = async (doc, username) => {
  const remoteRegisNumbers = await getAllRemoteRNs();
  if (remoteRegisNumbers.includes(doc._id)) {
    const error = new Error(
      `The registration number '${doc._id}' is already associated with another sample in the remote database. Change the corresponding sample and try again.`
    );
    error.name = doc._id;
    throw error;
  }
  if (doc.PicturesToRemove !== null)
    await removeRemotePictures(doc.PicturesToRemove);
  var pictures = doc.Pictures.map((uppyFile) =>
    retrieveNewURL(uppyFile.data, doc.No_Register, (file, url) =>
      uploadFile(file, url)
    ).then(
      () =>
        `${process.env.MINIO_BUCKET}/${username}/flora/${doc._id}/pictures/${uppyFile.data.name}`
    )
  );
  doc.Pictures = await Promise.all(pictures);

  var method = doc.RemoteIdToUpdate === null ? "POST" : "PUT";
  const result = await fetch("/services/flora/app/api/", {
    method: method,
    body: JSON.stringify(doc),
  });

  if (result.ok) {
    await localStorage.samples.delete(doc.id);
  } else {
    const error = new Error("Error during synchronization, try again");
    error.name = "SyncError";
  }
};

const FloraSamples = {
  insertLocalOne: (object) => {
    // return new Promise(() => {throw new Error()})
    return localStorage.samples.add(object);
  },

  syncAll: async (username) => {
    // return new Promise(() => {throw new Error()})

    const localData = await localStorage.samples.toArray();
    const remoteData = localData.map(async (doc) => {
      return syncDoc(doc, username);
    });
    const results = await Promise.all(remoteData.map((p) => p.catch((e) => e)));
    const errors = results.filter((result) => result instanceof Error);
    if (errors.length > 0) {
      const badRegisNumbers = [];
      errors.map((e) => {
        if (e.name === "SyncError")
          return new Promise(() => {
            throw new Error(e.message);
          });
        else badRegisNumbers.push(e.name);
      });
      return new Promise(() => {
        throw new Error(
          `The registration numbers '${badRegisNumbers.join(
            "', '"
          )}' are already associated with other samples in the remote database. Modify the corresponding samples and try again.`
        );
      });
    } else {
      return Promise.resolve();
    }
  },

  syncOne: async (doc, username) => {
    // return new Promise(() => {throw new Error()})

    return syncDoc(doc, username);
  },

  getAllRemoteSamples: () => {
    return fetch(`/services/flora/app/api/`)
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
  },

  getAllLocalSamples: () => {
    return localStorage.samples.toArray();
  },

  getRemoteSample: (id) => {
    return fetch(`/services/flora/app/api/${id}`)
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
  },

  getLocalSample: (id) => {
    return localStorage.samples.get(id);
  },

  removeRemoteSample: async (doc) => {
    await removeRemotePictures(doc.Pictures);
    return fetch(`/services/flora/app/api/${doc._id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        return response;
      } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw new Error(error);
      }
    });
  },

  removeLocalOne: (id) => {
    return localStorage.samples.delete(id);
  },

  updateLocalOne: (id, doc) => {
    return localStorage.samples.update(id, doc);
  },

  getPictures: (minioURLs) => {
    var urls = minioURLs.map((minioURL) => {
      const vector = minioURL.split("/").reverse();
      const filename = vector[0];
      const no_reg = vector[2];
      return fetch(`/services/flora/app/api/pictures/${no_reg}/${filename}`)
        .then((response) => response.text())
        .catch((e) => {
          console.error(e);
          throw e;
        });
    });
    return Promise.all(urls);
  },
  getAllRemoteRegisNumber: () => {
    return getAllRemoteRNs();
  },
  getAllLocalRegisNumber: () => {
    return localStorage.samples
      .toArray()
      .then((localSamples) => localSamples.map((doc) => doc._id));
  },
};

export { FloraSamples };
