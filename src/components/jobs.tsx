import Html from "@kitajs/html";
import { ScheduledJob } from "../scheduler";
import { colors, primaryHue } from "./theme";
import ActionButton from "./action-button";
import styled from "./styled";
import { formatDate, formatLuxonDate } from "../utils";
import Table from "./table";
import { JobWithHistory } from "../jobs";
import { JobHistory } from "../history";
import Card from "./card";
import JobActions from "./job-actions";

type Props = {
  jobs: JobWithHistory[];
};

export default function Jobs({ jobs, ...rest }: Props) {
  const X = <div></div>;
  return (
    <Card title="Webhooks">
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Schedule</th>
            <th>Next Trigger</th>
            <th>Last Trigger</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr>
              <td>{job.name}</td>
              <td>{job.cronExpression}</td>
              <td>{formatLuxonDate(job.cronJob.nextDate())}</td>
              <LastTrigger history={job.history[0]} />
              <StatusColumn running={job.cronJob.running}>
                {job.cronJob.running ? "Running" : "Stopped"}
              </StatusColumn>
              <td>
                <JobActions job={job} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}

const StatusColumn = styled("td")`
  &:is([running]) {
    color: ${colors.green["500"]};
  }

  &:not([running]) {
    color: ${colors.red["500"]};
  }
`;

type LastTriggerProps = { history: JobHistory | undefined };
const LastTrigger = ({ history }: LastTriggerProps) => {
  if (!history) {
    return <td>Never Triggered</td>;
  }
  const { triggered_at } = history;
  const formattedDate = formatDate(new Date(triggered_at));

  return (
    <TriggerColumn success={!!history.response_ok}>
      {formattedDate}
    </TriggerColumn>
  );
};

const TriggerColumn = styled<{ success: boolean }>("td")`
  &:is([success]) {
    color: ${colors.green["500"]};
  }

  &:not([success]) {
    color: ${colors.red["500"]};
  }
`;
