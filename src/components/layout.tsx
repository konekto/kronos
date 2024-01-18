import Html from "@kitajs/html";
import { Children } from "@kitajs/html";
import { globalStyles } from "./theme";

type LayoutProps = {
  children: Children;
};

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <>
      <style>{globalStyles}</style>
      <header>Cron</header>
      <main>{children}</main>
      <footer> </footer>
    </>
  );
}
