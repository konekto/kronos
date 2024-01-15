import { CronJob } from "cron";
import { ParsedJob, parseFile } from "./parser";

type JobRunner = (job: ScheduledJob) => any;

export async function schedule(
  path: string,
  variables = {},
  runner: JobRunner
) {
  const jobs = await parseFile(path, variables);
  return jobs.map((job) => scheduleJob(job, runner));
}

export type ScheduledJob = ParsedJob & { cronJob: CronJob };

export function scheduleJob(job: ParsedJob, runner: JobRunner): ScheduledJob {
  const { cronExpression } = job;

  const cronJob = createCronJob(cronExpression, () => runner(scheduledJob));
  const scheduledJob = { ...job, cronJob };

  return scheduledJob;
}

function createCronJob(exp: string, cb: () => any, start = true) {
  return new CronJob(
    exp,
    cb, // onTick
    null, // onComplete
    start
  );
}
