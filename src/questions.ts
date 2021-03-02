import prompts from "prompts";

export const askForLogin = () => {
  return prompts([
    {
      type: "text",
      name: "username",
      message: "Who are you?",
      validate: (username) =>
        username === "jerry" ? true : `You are not jerry.`,
    },
    {
      type: "password",
      name: "masterPassword",
      message: "Welcome jerry! What is the meaning of life?",
    },
  ]);
};

export const askForAction = () => {
  return prompts([
    {
      type: "select",
      name: "command",
      message: "What do you like to do now?",
      choices: [
        { title: "Get a password", value: "get" },
        { title: "Set a password", value: "set" },
      ],
    },
    {
      type: "text",
      name: "passwordName",
      message: "Which password?",
    },
  ]);
};

export const askForPasswordValue = async () => {
  const response = await prompts({
    type: "password",
    name: "passwordValue",
    message: "What is the new password?",
  });
  return response.passwordValue;
};
