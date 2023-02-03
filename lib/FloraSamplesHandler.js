import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);

const connect = async () => {
  await client.connect();
  const database = client.db("enbic2lab");
  const collection = database.collection("test_floras");
  return collection;
};

const preprocessDoc = (doc) => {
  delete doc.id;
  delete doc.RemoteIdToUpdate;
  delete doc.PicturesToRemove;
  delete doc?.Num_Species;
  delete doc?.Str_Date;
  doc.created_at = new Date(doc.created_at);
  for (var attr in doc) {
    if (
      [
        "Natural_Park",
        "Lithology",
        "Plot_Orientation",
        "Ecology",
        "Community",
        "Subcommunity",
      ].includes(attr) &&
      doc[attr] == ""
    )
      doc[attr] = null;
    else if (
      [
        "Coverage",
        "Altitude",
        "Plot_Slope",
        "Alt_Veg",
        "Plot_Area",
        "Community_Year",
        "Subcommunity_Year",
        "Latitude",
        "Longitude",
      ].includes(attr)
    )
      doc[attr] = parseFloat(doc[attr]);
  }
  return doc;
};

const FloraSamplesHandler = {
  postOne: (doc) => {
    return connect().then((collection) => {
      var res = preprocessDoc(doc);
      return collection.insertOne(res);
    });
  },

  updateOne: (doc) => {
    return connect().then((collection) => {
      var id = doc.RemoteIdToUpdate;
      var res = preprocessDoc(doc);
      return collection.updateOne({ _id: ObjectId(id) }, { $set: res });
    });
  },

  getAll: (username) => {
    return connect().then((collection) =>
      collection
        .find(
          { Authors: username },
          {
            projection: {
              _id: 1,
              Authors: 1,
              created_at: 1,
              Species: 1,
              Pictures: 1,
            },
          }
        )
        .toArray()
    );
  },

  getOne: (id) => {
    return connect().then((collection) =>
      collection.findOne({ _id: String(id) })
    );
  },

  removeOne: (id) => {
    return connect().then((collection) =>
      collection.deleteOne({ _id: String(id) })
    );
  },

  getAllRegisNumbers: () => {
    return connect()
      .then((collection) =>
        collection
          .find(
            {},
            {
              projection: {
                _id: 1,
              },
            }
          )
          .toArray()
      )
      .then((docs) => docs.map((doc) => doc._id));
  },
};

export { FloraSamplesHandler };
