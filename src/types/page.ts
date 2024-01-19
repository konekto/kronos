import { MatchedRoute } from "bun";

export type PageProps = {
  route: MatchedRoute;
  request: Request;
};
