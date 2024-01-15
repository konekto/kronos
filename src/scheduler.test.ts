import { expect, test } from "bun:test";
import { useFakeTimers, spy } from "sinon";
import { scheduleJob } from "./scheduler";

test("scheduleJob()", async () => {
  const clock = useFakeTimers();
  const cb = spy();
  const scheduledJob = await scheduleJob(
    {
      name: "test",
      cronExpression: "* * * * * *",
      method: "GET",
      url: "test.com",
    },
    cb
  );
  clock.tick(1000);
  expect(cb.callCount).toEqual(1);
  expect(cb.calledWithExactly(scheduledJob)).toBeTrue();
  clock.tick(1000);
  expect(cb.callCount).toEqual(2);
  scheduledJob.cronJob.stop();
  clock.tick(1000);
  expect(cb.callCount).toEqual(2);
});
