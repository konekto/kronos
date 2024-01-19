import Html from "@kitajs/html";
import { styled } from "./styled";
import ActionButton from "./action-button";
import { ScheduledJob } from "../scheduler";

type Props = { job: ScheduledJob; isDetail?: boolean };

export default function JobActions(props: Props) {
  const { job } = props;
  const { name, cronJob } = job;
  return (
    <Container>
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
  display: inline-flex;
  gap: 10px;
  height: 27px;

  align-items: center;

  & svg {
    padding: 5px;
    width: 20px;
    height: 20px;
  }
`;

const StopSVG = () => (
  <svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="css-i6dzq1"
  >
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);

const PlaySVG = () => (
  <svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="css-i6dzq1"
  >
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const TriggerSVG = () => (
  <svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="css-i6dzq1"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);
