import Html, { Children } from "@kitajs/html";
import styled from "./styled";
import colors from "tailwindcss/colors";
import { accentHue, primaryHue } from "./theme";

type Props = { title?: JSX.Element; children: Children };

export default function Card(props: Props) {
  const { title, children } = props;

  return (
    <Container>
      {title && <Title>{title}</Title>}
      {children}
    </Container>
  );
}

const Container = styled("div")`
  background-color: ${colors.white};
  border-radius: 22px;
  margin: 30px;
  box-shadow: 1px 2px 3px 0px ${colors[primaryHue]["100"]};
  padding: 20px;
`;

const Title = styled("div")`
  font-size: 24px;
  font-weight: 500;
  padding-bottom: 20px;
  margin: 0 0 20px 0;

  border-bottom: 1px solid ${colors[accentHue]["50"]};

  color: ${colors[primaryHue]["500"]};
`;
