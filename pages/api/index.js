import { FloraSamplesHandler } from "/lib/FloraSamplesHandler";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      /* GET ALL */
      const session = await getSession({ req });
      const username = session.user.username;
      const samples = await FloraSamplesHandler.getAll(username);
      res.status(200).json({
        body: JSON.stringify(samples),
      });
    } else if (req.method === "POST") {
      /* POST ONE */
      const document = JSON.parse(req.body);
      await FloraSamplesHandler.postOne(document);
      res.status(200).end();
    } else if (req.method === "PUT") {
      /* UPDATE ONE */
      const document = JSON.parse(req.body);
      await FloraSamplesHandler.updateOne(document);
      res.status(200).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: err?.code,
    });
  }
}
