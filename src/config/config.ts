import { config as conf } from "dotenv";

conf();

const _config = {
  port: process.env.PORT,
  database_uri: process.env.MONGO_URI,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  cloudName: process.env.CLOUDINARY_CLOUD,
  cloudinaryapikey: process.env.CLOUDINARY_API_KEY,
  cloudinarysecretkey: process.env.CLOUDINARY_API_SECRET,
};

export const config = Object.freeze(_config);
// we made read only
