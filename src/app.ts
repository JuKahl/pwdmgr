import { printWelcomeMessage, printNoAccess } from "./messages";
import { askForLogin, askForAction } from "./questions";
import { hasAccess, handleGetPassword, handleSetPassword } from "./commands";

const run = async () => {
  printWelcomeMessage();
  const login = await askForLogin();
  if (!hasAccess(login.masterPassword)) {
    printNoAccess();
    run();
    return;
  }

  const action = await askForAction();
  switch (action.command) {
    case "set":
      handleSetPassword(action.passwordName);
      break;
    case "get":
      handleGetPassword(action.passwordName);
      break;
  }
};

run();
