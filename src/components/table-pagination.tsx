import Html from "@kitajs/html";
import { Pagination } from "../jobs";
import styled from "./styled";
import colors from "tailwindcss/colors";
import { accentHue, primaryHue } from "./theme";

type Props = Pagination;
export default function TablePagination(props: Props) {
  const { count, page, totalPages } = props;
  const pages = generatePagesArray(props);
  return (
    <Container>
      {page - 20 >= 0 && (
        <PaginationButton
          active={false}
          title={`go to page ${page - 20}`}
          href={`?page=${page - 20}`}
        >
          <DoubleAngleLeftSVG />
        </PaginationButton>
      )}
      {page - 10 >= 0 && (
        <PaginationButton
          active={false}
          title={`go to page ${page - 10}`}
          href={`?page=${page - 10}`}
        >
          <AngleLeftSVG />
        </PaginationButton>
      )}
      {pages.map((p) => (
        <PaginationButton active={p === page} href={`?page=${p}`}>
          {p}
        </PaginationButton>
      ))}
      {page + 10 <= totalPages && (
        <PaginationButton
          active={false}
          title={`go to page ${page + 10}`}
          href={`?page=${page + 10}`}
        >
          <AngleRightSVG />
        </PaginationButton>
      )}
      {page + 20 <= totalPages && (
        <PaginationButton
          active={false}
          title={`go to page ${page + 20}`}
          href={`?page=${page + 20}`}
        >
          <DoubleAngleRightSVG />
        </PaginationButton>
      )}
    </Container>
  );
}

const Container = styled("div")`
  display: flex;
  background-color: ${colors.neutral["50"]};
  border-radius: 5px;
  padding: 10px 20px;
  box-shadow: 0 4px 6px ${colors.neutral["100"]};

  & > * {
    width: 20px;
    height: 18px;
    margin: auto;
    text-align: center;
    vertical-align: center;
  }

  & > a {
    padding: 5px;
    text-decoration: none;
    &:is([active]) {
      background: ${colors[primaryHue]["500"]};
      color: white;
      border: 1px solid ${colors[primaryHue]["700"]};
      border-radius: 3px;
    }

    &:not([active]) {
      background: white;
      color: ${colors[primaryHue]["500"]};
      border: 1px solid ${colors[accentHue]["100"]};
      border-radius: 3px;

      &:hover {
        background: ${colors[primaryHue]["500"]};
        color: white;
        border: 1px solid ${colors[primaryHue]["700"]};
        border-radius: 3px;
      }
    }

    & > svg {
      display: block;
      margin: auto;
    }
  }
`;

type PaginationButtonProps = {
  active: boolean;
};
const PaginationButton = styled<PaginationButtonProps>("a")``;

function generatePagesArray(options: Pagination) {
  const { page, totalPages } = options;

  if (totalPages < 10) {
    return Array.from({ length: 9 }).map((_, i) => i + 1);
  }

  let pages: number[] = [];
  let i = page - 1;
  while (pages.length < 4 && i > 0) {
    pages = [i, ...pages];
    i--;
  }
  i = page;
  while (pages.length < 9 && i < totalPages) {
    pages.push(i);
    i++;
  }

  return pages;
}

const AngleRightSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="10"
    viewBox="0 0 320 512"
    fill={"currentColor"}
  >
    {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
  </svg>
);

const AngleLeftSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="10"
    viewBox="0 0 320 512"
    fill={"currentColor"}
  >
    {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
  </svg>
);

const DoubleAngleRightSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="16"
    viewBox="0 0 512 512"
    fill={"currentColor"}
  >
    {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
    <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
  </svg>
);

const DoubleAngleLeftSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="16"
    viewBox="0 0 512 512"
    fill={"currentColor"}
  >
    {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
  </svg>
);
