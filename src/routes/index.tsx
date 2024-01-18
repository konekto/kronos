import Html from "@kitajs/html";
import { getAllJobsWithHistory, stopJobByName } from "../jobs";
import { render } from "../utils";
import Layout from "../components/layout";
import Jobs from "../components/jobs";

export async function handleIndex(req: Request) {
  console.log(req.method);
  console.log(req);

  if (req.method === "GET") {
    return renderIndex();
  }

  if (req.method === "POST") {
    const formData = await req.formData();
    console.log(formData);

    const action = formData.get("action");
    switch (action) {
      case "stop":
        const name = formData.get("name") as string;
        stopJobByName(name);
        return renderIndex();

      default:
        return new Response("Dev Error, Please provide an action", {
          status: 405,
        });
    }

    return new Response("Hello world!");
  }

  return new Response("Method Not Allowed", { status: 405 });
}

function renderIndex() {
  const jobs = getAllJobsWithHistory();
  return render(<Jobs jobs={jobs} />);
}
