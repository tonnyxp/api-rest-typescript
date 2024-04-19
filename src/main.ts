import { Server } from "./server";

const server = new Server();

server.start().catch(handleError);

function handleError(error: unknown) {
  console.error(error);
  process.exit(1);
}

process.on("uncaughtException", handleError);
