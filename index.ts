import { app } from "./src/app";
import { scheduleJobs } from "./src/jobs";
import Html from "@kitajs/html";
import { render } from "./src/utils";

scheduleJobs();

const router = new Bun.FileSystemRouter({
  style: "nextjs",
  dir: "./pages/",
});

const server = Bun.serve({
  async fetch(req) {
    let match = router.match(req);
    if (!match) {
      return new Response("");
    }
    let page = await require(match.filePath).default;

    return await page(req);
  },
});
//Bun.serve({ fetch: app });

console.log(`Running on http://localhost:${server.port}`);
