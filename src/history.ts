import { Database, Statement } from "bun:sqlite";

export let db: Database;

let insertQuery: Statement<any, any>;
let getQuery: Statement<any, any>;
let countQuery: Statement<any, any>;
let deleteOldQuery: Statement<any, any>;

export function init(path = "db/history.sqlite") {
  if (db) return;

  db = new Database(path);
  db.run("PRAGMA journal_mode = WAL;");
  db.run(`
      create table if not exists jobs_history (
        job_name        text not null,
        triggered_at    number not null,
        response_ok     boolean not null,
        response_status number not null,
        response_text   text not null
      );`);
  db.run(
    `create index if not exists jobs_history_index on jobs_history (job_name);`
  );

  insertQuery = db.query(
    `insert into jobs_history (job_name, triggered_at, response_ok, response_status, response_text) values ($job_name, $triggered_at, $response_ok, $response_status, $response_text);`
  );
  getQuery = db.query(
    "select * from jobs_history where job_name = ? ORDER BY triggered_at DESC LIMIT ? OFFSET ?;"
  );
  countQuery = db.query("select COUNT(*) from jobs_history;");

  deleteOldQuery = db.query(
    "delete from jobs_history where triggered_at in (select triggered_at from jobs_history order by triggered_at asc limit (select count(*) - 1000 from jobs_history));"
  );
}

export function truncate() {
  db.run("delete from jobs_history;");
}

export type JobHistory = {
  job_name: string;
  triggered_at: number;
  response_ok: 0 | 1;
  response_status: number;
  response_text: string;
};

export function insertJobHistory(h: JobHistory) {
  init();

  insertQuery.run({
    $job_name: h.job_name,
    $triggered_at: h.triggered_at,
    $response_ok: h.response_ok,
    $response_status: h.response_status,
    $response_text: h.response_text,
  });
  cleanUp(Date.now());
}

const oneHour = 1000 * 60 * 60;
let lastCleanup = Date.now();
export function cleanUp(now: number) {
  init();
  if (now - lastCleanup < oneHour) return;
  if (getCount() <= 1000) return;
  lastCleanup = now;
  deleteOldQuery.run();
}

export function getCount() {
  init();
  const countRow = countQuery.get();
  return countRow["COUNT(*)"];
}

export function getJobHistoryByName(name: string, limit = 1000, offset = 0) {
  init();
  const count = getCount();
  const history = getQuery.all(name, limit, offset) as JobHistory[];

  return { history, count };
}
