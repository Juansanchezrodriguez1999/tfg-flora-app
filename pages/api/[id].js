import { FloraSamplesHandler } from "/lib/FloraSamplesHandler";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    if (req.method === "GET") {
      /* GET ONE */
      const session = await getSession({ req });
      const sample = await FloraSamplesHandler.getOne(id);
      if (session.user.username in sample.Authors) {
        res.status(200).json({
          body: JSON.stringify(sample),
        });
      } else {
        throw new Error("You do not have permission to view this sample");
      }
    } else if (req.method === "DELETE") {
      /* DELETE ONE */
      await FloraSamplesHandler.removeOne(id);
      res.status(200).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: err?.code,
    });
  }
}
