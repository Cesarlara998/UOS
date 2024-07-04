import { MONGO_URI } from "./env";
import { connect } from "mongoose";

export default class Database {
  async mongooseDB() {
    console.log(MONGO_URI);
    console.log("Connecting to mongodb...");
    
    return await connect(MONGO_URI)
      .then(() => {
        console.log("connected to MongoDB");
      })
      .catch((err) => {
        console.log("Error connect to MongoDB");
        throw new Error(err);
      });
  }
}