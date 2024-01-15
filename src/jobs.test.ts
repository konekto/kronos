import { expect, test, beforeEach } from "bun:test";
import { scheduleJob } from "./scheduler";
import { getAllJobsWithHistory, setJobs, triggerJob } from "./jobs";
import { truncate, init } from "./history";

beforeEach(() => {
  init("test.sqlite");
  truncate();
});

test("getAllJobsWithHistory", async () => {
  const job = await scheduleJob(
    {
      name: "test",
      cronExpression: "* * * * * *",
      method: "GET",
      url: "https://google.com",
    },
    triggerJob
  );

  setJobs([job]);
  await wait(1000);
  await wait(1000);
  await wait(100);
  const [j] = await getAllJobsWithHistory();
  expect(j.name).toEqual("test");
  expect(j.history.length).toEqual(2);
  expect(j.history[0]!.response_ok).toEqual(1);
});

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
