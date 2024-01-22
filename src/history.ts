import { Database, Statement } from "bun:sqlite";

let insertQuery: Statement<any, any>;
let getQuery: Statement<any, any>;
let countQuery: Statement<any, any>;

let initialized = false;

export let db: Database;

export function init(path = "db/history.sqlite") {
  if (initialized) return;

  const d = new Database(path);
  d.run("PRAGMA journal_mode = WAL;");
  d.run(`
      create table if not exists jobs_history (
        job_name        text not null,
        triggered_at    number not null,
        response_ok     boolean not null,
        response_status number not null,
        response_text   text not null
      );`);
  d.run(
    `create index if not exists jobs_history_index on jobs_history (job_name);`
  );

  insertQuery = d.query(
    `insert into jobs_history (job_name, triggered_at, response_ok, response_status, response_text) values ($job_name, $triggered_at, $response_ok, $response_status, $response_text);`
  );
  getQuery = d.query(
    "select * from jobs_history where job_name = ? ORDER BY triggered_at DESC LIMIT ? OFFSET ?;"
  );
  countQuery = d.query("select COUNT(*) from jobs_history");

  initialized = true;

  db = d;
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
  return insertQuery.run({
    $job_name: h.job_name,
    $triggered_at: h.triggered_at,
    $response_ok: h.response_ok,
    $response_status: h.response_status,
    $response_text: h.response_text,
  });
}

export function getJobHistoryByName(name: string, limit = 1000, offset = 0) {
  init();
  const countRow = countQuery.get();
  const count = countRow["COUNT(*)"];

  const history = getQuery.all(name, limit, offset) as JobHistory[];

  return { history, count };
}
