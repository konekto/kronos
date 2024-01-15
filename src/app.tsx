import Html from "@kitajs/html";
import Jobs from "./components/jobs";
import { getAllJobsWithHistory } from "./jobs";

export async function app(req: Request) {
  const url = new URL(req.url);

  if (url.pathname === "/") {
    const jobs = await getAllJobsWithHistory();
    console.log(jobs);
    return render(<Jobs jobs={jobs} />);
  }

  return new Response("");
}

function render(jsx: any) {
  return new Response("<!doctype html>" + jsx, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
