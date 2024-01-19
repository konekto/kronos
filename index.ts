import { scheduleJobs } from "./src/jobs";
import { PageProps } from "./src/types/page";
import { render } from "./src/utils";

scheduleJobs();

const router = new Bun.FileSystemRouter({
  style: "nextjs",
  dir: "./pages/",
});

const server = Bun.serve({
  async fetch(req) {
    let route = router.match(req);
    if (!route) {
      throw new Error();
    }
    console.log(route);

    let page = await require(route.filePath).default;
    if (!page) {
      return render(`<h1>Problem reading file: ${route.filePath}</h1>`, route);
    }

    return await page({ request: req, route } satisfies PageProps);
  },
});
//Bun.serve({ fetch: app });

console.log(`Running on http://localhost:${server.port}`);
