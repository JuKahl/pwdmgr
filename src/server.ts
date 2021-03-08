import http from "http";
import dotenv from "dotenv";
import { connect } from "mongodb";
import { connectDB } from "./db";
import { type } from "os";
// import type { PasswordDoc } from "./db";
import { handleDelete, handleGet, handlePatch, handlePost } from "./routes";

dotenv.config();

const port = process.env.PORT;
const url = process.env.MONGODB_URL;

connectDB(url, "pwdmgr-julian");

const server = http.createServer(async (request, response) => {
  if (request.url === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.end("<h1>Safe Me!</h1>");
    return;
  }
  if (request.method === "POST") {
    handlePost(request, response);
    return;
  }
  if (request.method === "PATCH") {
    handlePatch(request, response);
    return;
  }

  const parts = request.url.match(/\/api\/passwords\/(\w+)/);
  if (!parts) {
    response.statusCode = 400;
    response.end();
    return;
  }
  const passwordName = parts[1];

  if (request.method === "GET") {
    handleGet(request, response, passwordName);
    return;
  }
  if (request.method === "DELETE") {
    handleDelete(request, response, passwordName);
    return;
  }

  response.statusCode = 405;
  response.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port} 🤘`);
});
