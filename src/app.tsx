import { handleIndex } from "./routes";

export async function app(req: Request) {
  const url = new URL(req.url);
  const { pathname } = url;

  switch (pathname) {
    case "/":
      return handleIndex(req);
    default:
      return new Response("");
  }
}
