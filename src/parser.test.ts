import { expect, test } from "bun:test";
import { parseString } from "./parser";

const JOBS = `
NAME post with token
CRON * * * * *
POST $APP_URL/api/post?token=$TOKEN
Content-Type: application/json

{
  "foo": "bar"
}

NAME get with token
CRON */2 * * * *
GET $APP_URL/api/get?token=$TOKEN

`;

test("post and get", () => {
  const jobs = parseString(JOBS, {
    APP_URL: "https://app.xyz",
    TOKEN: "secret",
  });
  expect(jobs.length).toBe(2);
  const [job1, job2] = jobs;

  expect(job1.name).toBe("post with token");
  expect(job1.cronExpression).toBe("* * * * *");
  expect(job1.method).toBe("POST");
  expect(job1.url).toBe("https://app.xyz/api/post?token=secret");
  expect(job1.headers).toEqual({
    "Content-Type": "application/json",
  });
  expect(job1.body).toBe('{\n  "foo": "bar"\n}');

  expect(job2.name).toBe("get with token");
  expect(job2.cronExpression).toBe("*/2 * * * *");
  expect(job2.method).toBe("GET");
  expect(job2.url).toBe("https://app.xyz/api/get?token=secret");
  expect(job2.headers).toEqual({});
  expect(job2.body).toBeUndefined();
});

test("no name error", () => {
  expect(() =>
    parseString(`
    CRON * * * * *
    GET $APP_URL/api/post?token=$TOKEN
    Content-Type: application/json
    `)
  ).toThrow(/CRON line/);
});

test("wrong cron line", () => {
  expect(() =>
    parseString(`
    NAME test
    GET $APP_URL/api/post?token=$TOKEN
    CRON * * * * *
    Content-Type: application/json
    `)
  ).toThrow(/CRON line/);

  expect(() =>
    parseString(`
    NAME test
    * * * * *
    GET $APP_URL/api/post?token=$TOKEN
    Content-Type: application/json
    `)
  ).toThrow(/CRON line/);

  expect(() =>
    parseString(`
    NAME test
    CRON dsf * * * *
    GET $APP_URL/api/post?token=$TOKEN
    Content-Type: application/json
    `)
  ).toThrow(/valid cron expression/);
});
