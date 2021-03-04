import { printWelcomeMessage, printNoAccess } from "./messages";
import { askForLogin, askForAction } from "./questions";
import { hasAccess, handleGetPassword, handleSetPassword } from "./commands";
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
  printWelcomeMessage();
  const login = await askForLogin();
  if (!hasAccess(login.masterPassword)) {
    printNoAccess();
    run();
    return;
  }
  const url = process.env.MONGODB_URL;

  try {
    await connectDB(url, "pwdmgr-julian");

    await closeDB();
  } catch (error) {
    console.error(error);

    const action = await askForAction();
    switch (action.command) {
      case "set":
        handleSetPassword(action.passwordName);
        break;
      case "get":
        handleGetPassword(action.passwordName);
        break;
    }
  }
};
run();
