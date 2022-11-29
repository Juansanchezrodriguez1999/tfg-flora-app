const Minio = require("minio");
import { getSession } from "next-auth/react";

var minioClient = new Minio.Client({
  endPoint: process.env.MINIO_URL,
  useSSL: process.env.MINIO_USE_SSL === "true",
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  try {
    const { params } = req.query;
    const noReg = params[0];
    const filename = params[1];
    const bucketName = process.env.MINIO_BUCKET;
    const session = await getSession({ req });
    const username = session.user.username;
    const objectName = username + "/flora/" + noReg + "/pictures/" + filename;

    if (req.method === "GET") {
      /* GET ONE */
      minioClient.presignedGetObject(bucketName, objectName, (err, url) => {
        if (err) throw err;
        res.end(url);
      });
    } else if (req.method === "PUT") {
      /* PUT ONE */
      minioClient.presignedPutObject(bucketName, objectName, (err, url) => {
        if (err) throw err;
        res.end(url);
      });
    } else if (req.method === "DELETE") {
      /* DELETE ONE */
      minioClient.removeObject(bucketName, objectName, (err) => {
        if (err) throw err;
        res.status(200).end();
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: err?.code,
    });
  }
}
