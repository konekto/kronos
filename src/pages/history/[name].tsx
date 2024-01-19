import Html from "@kitajs/html";

import History from "../../components/history";
import { getJobsWithPaginatedHistory } from "../../jobs";
import { PageProps } from "../../types/page";
import { getFormDataValue, render } from "../../utils";
import { handleJobActions } from "../../controllers/job-actions";
import { MatchedRoute } from "bun";

export default async function HistoryPage({ request, route }: PageProps) {
  const queryPage = route.query.page ?? "1";
  const page = Number(queryPage);

  if (!Number.isInteger(page)) {
    return new Response("Invalid Page", { status: 400 });
  }

  const name = route.params.name;

  if (!name) {
    return new Response("Not Found", { status: 404 });
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
          return renderHistory(name, page, route);
        }
      default:
        return await new Response("Invalid Input", {
          status: 400,
        });
    }
  }

  if (request.method === "GET") {
    return renderHistory(name, page, route);
  }

  return new Response("Method Not Allowed", { status: 405 });
}

function renderHistory(name: string, page: number, route: MatchedRoute) {
  const job = getJobsWithPaginatedHistory(name, page);
  return render(<History job={job} />, route);
}
