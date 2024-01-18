import Html from "@kitajs/html";
import Layout from "./components/layout";

export function render(jsx: any) {
  return new Response("<!doctype html>" + <Layout>{jsx}</Layout>, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
