import Html from "@kitajs/html";

export function app(req: Request) {
  return render(<h1>Hello</h1>);
}

function render(jsx: any) {
  return new Response("<!doctype html>" + jsx, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
