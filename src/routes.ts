import http from "http";
import {
  connectDB,
  createPasswordDoc,
  deletePasswordDoc,
  readPasswordDoc,
  updatePasswordValue,
} from "./db";
import type { PasswordDoc } from "./db";

export const handleGet = async (
  request: http.IncomingMessage,
  response: http.ServerResponse,
  passwordName: string
) => {
  const passwordDoc = await readPasswordDoc(passwordName);
  if (!passwordDoc) {
    response.statusCode = 404;
    response.end();
    return;
  }
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(passwordDoc));
  return;
};

export const handlePost = async (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => {
  const newPassword = await parseJSONBody<PasswordDoc>(request);
  const passwordDoc = await createPasswordDoc(newPassword);
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(passwordDoc));
  return;
};

export const handleDelete = async (
  request: http.IncomingMessage,
  response: http.ServerResponse,
  passwordName: string
) => {
  const passwordDoc = await deletePasswordDoc(passwordName);
  if (!passwordDoc) {
    response.statusCode = 404;
    response.end();
    return;
  }
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(passwordDoc));
  return;
};

export const handlePatch = async (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => {
  const newPassword = await parseJSONBody<PasswordDoc>(request);
  const passwordDoc = await updatePasswordValue(
    newPassword.name,
    newPassword.value
  );
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(passwordDoc));
};

const parseJSONBody = <T>(request: http.IncomingMessage): Promise<T> => {
  return new Promise((resolve) => {
    let data = "";
    request.on("data", (chunk) => {
      data += chunk;
    });
    request.on("end", () => {
      resolve(JSON.parse(data));
    });
  });
};
