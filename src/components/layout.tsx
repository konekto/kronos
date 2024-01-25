import Html from "@kitajs/html";
import { Children } from "@kitajs/html";
import { globalStyles } from "./theme";
import { styled, Styles } from "./styled";
import { MatchedRoute } from "bun";

type LayoutProps = {
  children: Children;
  route: MatchedRoute;
};

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <>
      <head>
        <title>kronos</title>
        <style>{globalStyles}</style>
        <Styles />
      </head>
      <body>
        <Header>
          <a href="/">
            <em>Kronos</em>
          </a>
        </Header>
        <Main>{children}</Main>
        <footer> </footer>
      </body>
    </>
  );
}

const Main = styled("main")`
  padding: 100px 30px;
`;
const Header = styled("header")`
  color: white;
  padding: 10px 20px;
  height: 60px;
  vertical-align: center;

  & a {
    font-size: 80px;
    font-weight: 700;
    line-height: 1.1;
    background: linear-gradient(45deg, #f83a3a 10%, #f13dd4 50%, #7000ff 90%);
    background-clip: border-box;
    background-clip: text;
    padding: 0 5px;
    -webkit-text-fill-color: transparent;
    color: #fff;
    letter-spacing: 1.2px;
    text-decoration: none;
  }
`;
