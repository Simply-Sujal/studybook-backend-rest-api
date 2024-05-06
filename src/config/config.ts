import { config as conf } from "dotenv";

conf();

const _config = {
  port: process.env.PORT,
  database_uri: process.env.MONGO_URI,
};

export const config = Object.freeze(_config);
// we made read only
