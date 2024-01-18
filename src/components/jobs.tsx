import Html from "@kitajs/html";
import { ScheduledJob } from "../scheduler";
import { colors, primaryHue } from "./theme";
import ActionButton from "./action-button";
import styled from "./styled";

type Job = Omit<ScheduledJob, "cronJob">;

type Props = {
  jobs: ScheduledJob[];
};

export default function Jobs({ jobs, ...rest }: Props) {
  const X = <div></div>;
  return (
    <Card>
      <Title>Webhooks</Title>

      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Schedule</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(({ name, cronExpression, cronJob }) => (
            <tr>
              <td>{name}</td>
              <td>{cronExpression}</td>
              <StatusColumn running={cronJob.running}>
                {cronJob.running ? "Running" : "Stopped"}
              </StatusColumn>
              <ActionsColumn>
                <a href="/history">
                  <HistorySVG />
                </a>
                {cronJob.running ? (
                  <ActionButton
                    fields={[{ name: "name", value: name }]}
                    action="stop"
                    method="post"
                    title={"Stop"}
                  >
                    <StopSVG />
                  </ActionButton>
                ) : (
                  <ActionButton
                    fields={[{ name: "name", value: name }]}
                    action="start"
                    method="post"
                    title={"Start"}
                  >
                    <PlaySVG />
                  </ActionButton>
                )}
              </ActionsColumn>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
const Card = styled("div")`
  background-color: ${colors.white};
  border-radius: 22px;
  margin: 30px;
  box-shadow: 1px 2px 3px 0px ${colors[primaryHue]["100"]};
  padding: 20px;
`;

const Title = styled("h2")`
  color: ${colors[primaryHue]["500"]};
  margin: 0 0 20px 0;
`;

const Table = styled("table")`
  border-radius: 6px;
  overflow: hidden;

  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  box-shadow: 0 4px 6px ${colors[primaryHue]["100"]};

  thead {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }

  th,
  td {
    padding: 15px;
    text-align: left;
    border-radius: 0;
  }

  th {
    background-color: ${colors[primaryHue]["400"]};
    color: #fff;
  }

  tr:nth-child(even) {
    background-color: ${colors.neutral["100"]};
  }

  tr:nth-child(odd) {
    background-color: ${colors.neutral["50"]};
  }

  tr:hover {
    background-color: ${colors.neutral["200"]};
    transition: background-color 0.3s ease-in-out;
  }
`;
const StatusColumn = styled("td")`
  &:is([running]) {
    color: ${colors.green["500"]};
  }

  &:not([running]) {
    color: ${colors.red["500"]};
  }
`;

const ActionsColumn = styled("td")`
  display: flex;
  gap: 10px;

  align-items: center;
`;
const StopSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="30"
    width="30"
    viewBox="0 0 384 512"
    fill={colors.red[500]}
  >
    {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
    <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
  </svg>
);

const PlaySVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="30"
    width="30"
    fill={colors.green[500]}
    viewBox="0 0 384 512"
  >
    {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
  </svg>
);

const HistorySVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="30"
    width="30"
    fill={colors[primaryHue]["500"]}
    viewBox="0 0 512 512"
  >
    {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
    <path d="M32 32H480c17.7 0 32 14.3 32 32V96c0 17.7-14.3 32-32 32H32C14.3 128 0 113.7 0 96V64C0 46.3 14.3 32 32 32zm0 128H480V416c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V160zm128 80c0 8.8 7.2 16 16 16H336c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16z" />
  </svg>
);
