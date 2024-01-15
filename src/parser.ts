export async function parseFile(path: string, variables = {}) {
  const file = Bun.file(path);
  return parseString(await file.text(), variables);
}

export function parseString(fileContent: string, variables = {}) {
  const injectedFile = inject(fileContent, variables).trim();

  const jobs = injectedFile.split("NAME").filter(Boolean);

  return jobs.map((job) => createJob(job));
}

function inject(fileContent: string, variables: Record<string, any>) {
  let res = fileContent;
  Object.keys(variables).map(
    (v) => (res = res.replaceAll(`\$${v}`, variables[v]))
  );
  return res;
}

function createJob(job: string) {
  const jobParams = parseJob(job);
  validateJob(jobParams);
  return jobParams;
}

export type ParsedJob = {
  body?: string;
  method: string;
  url: string;
  cronExpression: string;
  name: string;
  headers?: Record<string, string>;
};

function parseJob(job: string): ParsedJob {
  const [params, body] = job.trim().split("\n\n");

  const [name, cronLine, methodAndUrlLine, ...headersLines] = params
    .split("\n")
    .map((s) => s.trim());

  if (cronLine.indexOf("CRON") !== 0) {
    throw new Error(
      "CRON line has to be in the second position of a job (after NAME) and include the CRON keyword"
    );
  }

  const cronExpressionArray = cronLine.split(" ").slice(1);
  const cronExpression = cronExpressionArray.join(" ");
  const [method, url] = methodAndUrlLine.split(" ");
  const headers: Record<string, any> = {};

  headersLines.map((line) => {
    const [key, value] = line.split(": ");
    headers[key] = value;
  });

  return {
    body,
    method,
    url,
    cronExpression,
    name,
    headers,
  };
}

const HTTP_METHODS = [
  "POST",
  "GET",
  "PUT",
  "HEAD",
  "DELETE",
  "CONNECT",
  "OPTIONS",
  "TRACE",
];

function validateJob(jobParams: ParsedJob) {
  const { name, method, body, headers, cronExpression, url } = jobParams;

  if (!isValidCronExpression(cronExpression)) {
    throw new Error(
      `[${name}] the cron expression (${cronExpression}) is invalid. Please provide a valid cron expression.`
    );
  }

  if (!method || !HTTP_METHODS.includes(method)) {
    throw new Error(`[${name}] provided unrecognized method (${method}): allowed methods are: 
    ${HTTP_METHODS.map((method) => `"${method}"`).join(", ")}`);
  }

  if (method === "GET" && (body || (headers && headers["Content-Type"]))) {
    console.warn(`[${name}] provided body, or Content-Type for a GET request`);
  }

  if (headers && !headers["Content-Type"] && body) {
    console.warn(
      "provided a body without Content-Type, defaults to application/json",
      jobParams
    );
  }

  if (!cronExpression) {
    throw new Error(
      `[${name}] did not provide a cron expression please check file`
    );
  }

  if (!url) {
    throw new Error(`[${name}] did not provide a url for please check file`);
  }

  if (
    body &&
    headers &&
    headers["Content-Type"] === "application/json" &&
    method !== "GET"
  )
    try {
      JSON.parse(body);
    } catch (e) {
      throw new Error(`[${name}] please provide a valid json. Parsing failed due to: 
      ${e}`);
    }
}

function isValidCronExpression(exp: string) {
  return /((((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7})/.test(exp);
}
