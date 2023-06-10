import mongoose from "mongoose";
import { Nitro } from "nitropack";

export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig();

  try {
    await mongoose.connect(config.mongoUri);
    console.log("Connection to MongoDB is done!");
  } catch (error) {
    console.log(error);
  }
};
