import { app } from "./src/app";

const server = Bun.serve({ fetch: app });

console.log(`Running on http://localhost:${server.port}`);
