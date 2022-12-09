import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);

const connect = async () => {
  await client.connect();
  const database = client.db("enbic2lab");
  const collection = database.collection("test_species");
  return collection;
};

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      /* GET ALL */
      const doc_species = await await connect().then((collection) =>
        collection
          .find(
            {},
            { projection: { _id: 1,Species:1 } }
          )
          .toArray()
      );
      res.status(200).json({
        body: JSON.stringify(doc_species),
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: err?.code,
    });
  }
}
