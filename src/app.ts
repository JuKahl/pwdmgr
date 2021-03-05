import { printWelcomeMessage, printNoAccess } from "./messages";
import { askForLogin, askForAction } from "./questions";
import {
  hasAccess,
  handleGetPassword,
  handleSetPassword,
  handleDeletePassword,
} from "./commands";
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

    const action = await askForAction();
    switch (action.command) {
      case "set":
        await handleSetPassword(action.passwordName);
        break;
      case "get":
        await handleGetPassword(action.passwordName);
        break;
      // case "update:":
      //   await handleUpdatePassword(action.passwordName);
      //   break;
      case "delete":
        await handleDeletePassword(action.passwordName);
        break;
    }
    await closeDB();
  } catch (error) {
    console.error(error);
  }
};
run();
