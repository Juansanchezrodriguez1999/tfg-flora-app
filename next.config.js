const withPWA = require("next-pwa");
const runtimeCaching = require("./cache.js");

module.exports = withPWA({
  reactStrictMode: true,
  basePath: "/services/flora/app",
  assetPrefix: "/services/flora/app",
  pwa: {
    dest: "public",
    runtimeCaching,
    register: true,
    skipWaiting: true,
  },



  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    MINIO_URL: process.env.MINIO_URL,
    MINIO_USE_SSL: process.env.MINIO_USE_SSL,
    MINIO_BUCKET: process.env.MINIO_BUCKET,
    MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY,
    MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY,
    MONGO_URI: process.env.MONGO_URI,
    MONGO_DATABASE: process.env.MONGO_DATABASE,
    MONGO_COLLECTION: process.env.MONGO_COLLECTION
  },
});
