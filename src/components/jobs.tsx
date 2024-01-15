import Html from "@kitajs/html";
import { ScheduledJob } from "../scheduler";

type Job = Omit<ScheduledJob, "cronJob">;

type Props = {
  jobs: Job[];
};

export default function Jobs(props: Props) {
  return (
    <ul>
      {props.jobs.map((j) => (
        <li>{j.name}</li>
      ))}
    </ul>
  );
}
