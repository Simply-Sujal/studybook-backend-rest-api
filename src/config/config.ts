import { config as conf } from "dotenv";

conf();

const _config = {
  port: process.env.PORT,
  database_uri: process.env.MONGO_URI,
  env: process.env.NODE_ENV,
};

export const config = Object.freeze(_config);
// we made read only
