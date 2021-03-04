import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import {
  closeDB,
  connectDB,
  getColletion,
  createPasswordDoc,
  readPasswordDoc,
  updatePasswordValue,
  updatePasswordDoc,
  deletePasswordDoc,
} from "./db";
dotenv.config();

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    await connectDB(url, "pwdmgr-julian");

    await closeDB();
  } catch (error) {
    console.error(error);
  }
};

run();
