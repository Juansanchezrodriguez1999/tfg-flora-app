import { FloraSamplesHandler } from "/lib/FloraSamplesHandler";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      /* GET ALL */
      const regisNumbers = await FloraSamplesHandler.getAllRegisNumbers();
      res.status(200).json({
        body: JSON.stringify(regisNumbers),
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: err?.code,
    });
  }
}