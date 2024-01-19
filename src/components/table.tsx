import Html, { PropsWithChildren } from "@kitajs/html";
import { styled } from "./styled";
import type { Pagination } from "../jobs";
import TablePagination from "./table-pagination";

type Props = PropsWithChildren<JSX.IntrinsicElements["table"]> &
  (
    | { paginated?: undefined }
    | ({
        paginated: true;
      } & Pagination)
  );

export default function Table(props: Props) {
  const paginated = props.paginated;
  if (!paginated) {
    return <T {...props}>{props.children}</T>;
  }

  return (
    <Container>
      <T {...props}>{props.children}</T>
      <TablePagination {...props} />
    </Container>
  );
}

const Container = styled("div")`
  display: flex;
  flex-direction: column;

  & :last-child {
    align-self: flex-end;
  }
`;

const T = styled("table")`
  overflow: hidden;

  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);

  & th,
  td {
    padding: 18px 20px;
    text-align: left;
    border-radius: 0;
    color: rgba(180, 188, 208, 0.7);
    font-size: 14px;
  }

  th:last-child,
  td:last-child {
    text-align: right;
  }

  & th {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 13px;
  }

  & tbody tr:nth-child(odd) {
    background: rgba(255, 255, 255, 0.01);
  }

  & tbody tr:hover {
    background: rgba(255, 255, 255, 0.05);
    transition: background-color 0.3s ease-in-out;
  }
`;
