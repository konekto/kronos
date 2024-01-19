import Html from "@kitajs/html";
import { Children } from "@kitajs/html";
import { globalStyles, primaryHue } from "./theme";
import styled from "./styled";
import colors from "tailwindcss/colors";
import { MatchedRoute } from "bun";

type LayoutProps = {
  children: Children;
  route: MatchedRoute;
};

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <>
      <style>{globalStyles}</style>
      <Header>Cron</Header>
      <Main>{children}</Main>
      <footer> </footer>
    </>
  );
}

const Main = styled("main")`
  padding: 30px;
`;
const Header = styled("header")`
  background: ${colors.white};
  color: ${colors[primaryHue]["500"]};
  padding: 10px 20px;
  height: 60px;
  vertical-align: center;

  font-size: 34px;
  font-style: normal;
  font-weight: 700;
  line-height: 60px;
  letter-spacing: -0.68px;
  box-shadow: 1px 2px 3px 0px ${colors[primaryHue]["100"]};
`;
