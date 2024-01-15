import { app } from "./src/app";
import { scheduleJobs } from "./src/jobs";

scheduleJobs();

const server = Bun.serve({ fetch: app });

console.log(`Running on http://localhost:${server.port}`);
