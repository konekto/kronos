import Html from "@kitajs/html";
import {
  getAllJobsWithHistory,
  startJobByName,
  stopJobByName,
} from "../src/jobs";
import Jobs from "../src/components/jobs";
import { render } from "../src/utils";

export default async function Index(req: Request) {
  if (req.method === "GET") {
    return renderIndex();
  }

  if (req.method === "POST") {
    const formData = await req.formData();

    const action = formData.get("action") as string;
    switch (action) {
      case "stop":
        return handleStop(formData);

      case "start":
        return handleStart(formData);

      default:
        return await new Response("Dev Error, Please provide an action", {
          status: 405,
        });
    }
  }

  return new Response("Method Not Allowed", { status: 405 });
}

function renderIndex() {
  const jobs = getAllJobsWithHistory();
  return render(<Jobs jobs={jobs} />);
}

function handleStop(formData: FormData) {
  const name = formData.get("name");
  if (typeof name !== "string" || !name) {
    return render("Please Provide Job Name");
  }

  stopJobByName(name);
  return renderIndex();
}

function handleStart(formData: FormData) {
  const name = formData.get("name");
  if (typeof name !== "string" || !name) {
    return render("Please Provide Job Name");
  }

  startJobByName(name);
  return renderIndex();
}
