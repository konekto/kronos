import Html from "@kitajs/html";
import { Pagination } from "../jobs";
import { styled } from "./styled";
import { grayColor, pinkColor } from "./theme";

type Props = Pagination;
export default function TablePagination(props: Props) {
  const { page } = props;
  const { pages, currentScreen, lastScreen } = generatePagesArray(props);
  console.log({ pages, currentScreen, lastScreen });
  return (
    <Container>
      {currentScreen > 0 && (
        <PaginationButton
          active={false}
          href={`?page=${(currentScreen - 1) * navigablePages + 1}`}
        >
          <AngleLeftSVG />
        </PaginationButton>
      )}
      {pages.map((p) => (
        <PaginationButton active={p === page} href={`?page=${p}`}>
          {p}
        </PaginationButton>
      ))}
      {currentScreen !== lastScreen && (
        <PaginationButton
          active={false}
          href={`?page=${(currentScreen + 1) * navigablePages + 1}`}
        >
          <AngleRightSVG />
        </PaginationButton>
      )}
    </Container>
  );
}

const Container = styled("div")`
  display: flex;
  border-radius: 5px;
  padding: 10px 20px;

  & > * {
    color: ${grayColor};
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
      color: white;
    }

    &:not([active]) {
      &:hover {
        color: rgba(255, 255, 255, 0.8);
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

const navigablePages = 7;

function generatePagesArray(options: Pagination) {
  const { page, totalPages } = options;

  console.log(page, totalPages);

  const currentScreen = Math.floor(page / navigablePages);
  const lastScreen = Math.floor(totalPages / navigablePages);

  console.log({ page, totalPages, currentScreen, lastScreen });

  let pages;

  if (totalPages < navigablePages) {
    pages = Array.from({ length: totalPages }).map((_, i) => i + 1);

    return { currentScreen, lastScreen, pages };
  }

  if (currentScreen === lastScreen) {
    pages = Array.from({
      length: totalPages - lastScreen * navigablePages,
    }).map((_, i) => lastScreen * navigablePages + i + 1);
    return { currentScreen, lastScreen, pages };
  }

  pages = Array.from({ length: navigablePages }).map(
    (_, i) => currentScreen * navigablePages + i + 1
  );

  return { currentScreen, lastScreen, pages };
}

const AngleRightSVG = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    stroke-width="2"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="css-i6dzq1"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const AngleLeftSVG = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    stroke-width="2"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="css-i6dzq1"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);
