import Html, { Children } from "@kitajs/html";
import { styled } from "./styled";

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
  position: relative;
  background: linear-gradient(
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  border-radius: 22px;
  margin: 30px;
  padding: 50px;

  &:before {
    content: "";
    pointer-events: none;
    user-select: none;
    position: absolute;
    inset: 0px;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.07)
    );
    mask-mode: match-source, match-source;
    mask-repeat: repeat, repeat;
    mask-clip: content-box, border-box;
    mask-origin: content-box, border-box;
    mask-position: 0% 0%, 0% 0%;
    mask-size: auto, auto;
    mask-image: linear-gradient(black, black), linear-gradient(black, black);
    mask-composite: exclude;
  }
`;

const Title = styled("div")`
  font-size: 30px;
  font-weight: 700;
  padding-bottom: 20px;
  margin: 0 0 20px 0;
`;
