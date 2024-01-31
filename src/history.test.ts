import { expect, test } from "bun:test";

import { cleanUp, getCount, insertJobHistory, init, truncate } from "./history";

init("test.sqlite");
truncate();

test("cleanUp", () => {
  let now = Date.now();

  for (let i = 0; i < 1002; i++) {
    insertJobHistory({
      job_name: "test",
      response_ok: 1,
      response_status: 200,
      response_text: "",
      triggered_at: now++,
    });
  }

  expect(getCount()).toEqual(1002);
  cleanUp(now);
  expect(getCount()).toEqual(1002);
  cleanUp(now + 1000 * 60 * 60 + 1);
  expect(getCount()).toEqual(1000);
});
