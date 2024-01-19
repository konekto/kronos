import Html from "@kitajs/html";
import { getAllJobsWithLastTrigger } from "../jobs";
import Jobs from "../components/jobs";
import { getFormDataValue, render } from "../utils";
import { PageProps } from "../types/page";
import { handleJobActions } from "../controllers/job-actions";
import { MatchedRoute } from "bun";

export default async function Index({ request, route }: PageProps) {
  if (request.method === "GET") {
    return renderIndex(route);
  }

  if (request.method === "POST") {
    const formData = await request.formData();
    let name: string;
    let action: string;
    try {
      action = getFormDataValue(formData, "action");
      name = getFormDataValue(formData, "name");
    } catch {
      return await new Response("Invalid Input", {
        status: 400,
      });
    }

    switch (action) {
      case "stop":
      case "start":
      case "trigger":
        if (handleJobActions(name, action)) {
          return renderIndex(route);
        }
      default:
        return await new Response("Invalid Input", {
          status: 400,
        });
    }
  }

  return new Response("Method Not Allowed", { status: 405 });
}

function renderIndex(route: MatchedRoute) {
  const jobs = getAllJobsWithLastTrigger();
  return render(<Jobs jobs={jobs} />, route);
}
