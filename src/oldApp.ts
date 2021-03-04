import prompts from "prompts";

const run = async () => {
  console.log("Welcome to pwdmgr!");

  const response = await prompts([
    {
      type: "text",
      name: "username",
      message: "Who are you?",
      validate: (username) =>
        username === "jerry" ? true : `You are not jerry.`,
    },
    {
      type: "password",
      name: "password",
      message: "Welcome jerry! What is the meaning of life?",
      validate: (password) =>
        password === "420" ? true : `You are not jerry.`,
    },
  ]);
};

run();
