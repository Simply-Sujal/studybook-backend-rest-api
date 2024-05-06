import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to db successfully");
    });

    mongoose.connection.on("error", (error) => {
      console.log("Error in connecting to database", error);
    });

    await mongoose.connect(config.database_uri as string);
  } catch (error) {
    console.log("Failed to connect with db", error);
    process.exit(1);
  }
};

export default connectDB;
