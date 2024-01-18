import Html from "@kitajs/html";
import { getAllJobsWithHistory } from "../jobs";
import { render } from "../utils";
import Layout from "../components/layout";
import Jobs from "../components/jobs";

export async function handleIndex(req: Request) {
  console.log(await req.formData());
  const jobs = await getAllJobsWithHistory();

  return render(<Jobs jobs={jobs} />);
}
