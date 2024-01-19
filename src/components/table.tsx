import Html, { PropsWithChildren } from "@kitajs/html";
import colors from "tailwindcss/colors";
import styled from "./styled";
import { primaryHue } from "./theme";
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
  border-radius: 6px;
  overflow: hidden;

  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  box-shadow: 0 4px 6px ${colors.neutral["200"]};

  & thead {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }

  & th,
  td {
    padding: 15px;
    text-align: left;
    border-radius: 0;
  }

  & th {
    background-color: ${colors[primaryHue]["400"]};
    color: #fff;
  }

  & tr:nth-child(even) {
    background-color: ${colors.neutral["100"]};
  }

  & tr:nth-child(odd) {
    background-color: ${colors.neutral["50"]};
  }

  & tr:hover {
    background-color: ${colors.neutral["200"]};
    transition: background-color 0.3s ease-in-out;
  }
`;
