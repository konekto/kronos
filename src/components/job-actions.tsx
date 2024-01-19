import Html from "@kitajs/html";
import styled from "./styled";
import ActionButton from "./action-button";
import colors from "tailwindcss/colors";
import { primaryHue } from "./theme";
import { ScheduledJob } from "../scheduler";

type Props = { job: ScheduledJob };

export default function JobActions(props: Props) {
  const { job } = props;
  const { name, cronJob } = job;
  return (
    <Container>
      <a href={`history/${encodeURI(name)}`} title="View History">
        <HistorySVG />
      </a>
      {cronJob.running ? (
        <ActionButton
          fields={[{ name: "name", value: name }]}
          action="stop"
          method="post"
          title={"Stop Job"}
        >
          <StopSVG />
        </ActionButton>
      ) : (
        <ActionButton
          fields={[{ name: "name", value: name }]}
          action="start"
          method="post"
          title={"Start Job"}
        >
          <PlaySVG />
        </ActionButton>
      )}
      <ActionButton
        fields={[{ name: "name", value: name }]}
        action="trigger"
        method="post"
        title={"Trigger Job"}
      >
        <TriggerSVG />
      </ActionButton>
    </Container>
  );
}

const Container = styled("div")`
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

const TriggerSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="30"
    width="30"
    viewBox="0 0 448 512"
    fill={colors.amber["500"]}
  >
    {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
    <path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z" />
  </svg>
);
