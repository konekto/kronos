import Html from "@kitajs/html";
import Layout from "./components/layout";
import { DateTime } from "luxon";
import { MatchedRoute } from "bun";
export function render(jsx: any, route: MatchedRoute) {
  const { pathname } = route;
  return new Response(
    "<!doctype html>" + <Layout route={route}>{jsx}</Layout>,
    {
      headers: { "content-type": "text/html; charset=utf-8" },
    }
  );
}

export function formatLuxonDate(date: DateTime<boolean>) {
  return `${date.toISODate()} ${date.toISOTime()?.substring(0, 5)}`;
}

export function formatDate(date: Date | null) {
  if (!date) {
    return "None";
  }

  const dateString = date.toISOString();
  return dateString.substring(0, dateString.length - 8).replace("T", " ");
}

export function getFormDataValue(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    throw new Error("");
  }

  return value;
}
