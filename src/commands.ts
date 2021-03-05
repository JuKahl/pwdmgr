import {
  createPasswordDoc,
  readPasswordDoc,
  deletePasswordDoc,
  updatePasswordDoc,
  PasswordDoc,
  updatePasswordValue,
} from "./db";
import {
  printPassword,
  printPasswordDelete,
  printPasswordSet,
} from "./messages";
import { askForPasswordValue } from "./questions";

export const hasAccess = (masterPassword: string): boolean =>
  masterPassword === "420";

export const handleSetPassword = async (
  passwordName: string
): Promise<void> => {
  const response = await readPasswordDoc(passwordName);
  const passwordValue = await askForPasswordValue();
  if (!response) {
    await createPasswordDoc({ name: passwordName, value: passwordValue });
    printPasswordSet(passwordName);
  } else {
    await updatePasswordValue(passwordName, passwordValue);
    console.log(`Your ${passwordName} password was updated.`);
  }
};

export const handleGetPassword = async (
  passwordName: string
): Promise<void> => {
  const response = await readPasswordDoc(passwordName);
  if (!response) {
    console.log("No password found!");
    return;
  }
  // console.log(`A password already exists for ${passwordName}. You can change it now.`);

  printPassword(response.name, response.value);
};

export const handleDeletePassword = async (
  passwordName: string
): Promise<void> => {
  await deletePasswordDoc(passwordName);
  printPasswordDelete(passwordName);
};

// export const handleUpdatePassword = async (
//   passwordName: string
// ): Promise<void> => {
//   const passwordValue = await askForPasswordValue();
//   await updatePasswordDoc({
//     name: passwordName,
//     $set: passwordValue,
//   });
//   printPasswordUpdate(passwordName);
// };
