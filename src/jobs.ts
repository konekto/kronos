import { getJobHistoryByName, insertJobHistory } from "./history";
import { ScheduledJob, schedule } from "./scheduler";

export let jobs: ScheduledJob[] = [];

export async function scheduleJobs() {
  jobs = await schedule("./jobs", Bun.env, triggerJob);
}

export function setJobs(j: ScheduledJob[]) {
  jobs = j;
}

export function getAllJobsWithHistory() {
  return jobs.map((j) => {
    const history = getJobHistoryByName(j.name);
    return { ...j, history };
  });
}

export function startJobByName(name: string) {
  return getJobByName(name).cronJob.start();
}

export function stopJobByName(name: string) {
  return getJobByName(name).cronJob.stop();
}

export function triggerJobByName(name: string) {
  return triggerJob(getJobByName(name));
}

function getJobByName(name: string) {
  const job = jobs.find((j) => j.name === name);
  if (!job) {
    throw new Error(`Job [${name}] not found`);
  }
  return job;
}

export async function triggerJob(job: ScheduledJob) {
  const { name, url, body, headers, method } = job;

  const time = Date.now();

  console.log(`Job [${name}] triggered at ${time}`);

  const resp = await fetch(url, { method, headers, body });
  const { ok, status } = resp;
  const text = await resp.text();

  console.log(`Job [${name}] responded with ${status}`);

  insertJobHistory({
    job_name: name,
    triggered_at: time,
    response_ok: ok ? 1 : 0,
    response_status: status,
    response_text: text,
  });

  if (!ok) {
    //TODO email
  }

  return { time, ok, status, text };
}
