import { startJobByName, stopJobByName, triggerJobByName } from "../jobs";

type Action = "stop" | "start" | "trigger";
export function handleJobActions(name: string, action: Action) {
  switch (action) {
    case "stop":
      return handleStop(name);

    case "start":
      return handleStart(name);
    case "trigger":
      return handleTrigger(name);

    default:
      return false;
  }
}

function handleStop(name: string) {
  stopJobByName(name);
  return true;
}

function handleStart(name: string) {
  startJobByName(name);
  return true;
}

function handleTrigger(name: string) {
  triggerJobByName(name);
  return true;
}
