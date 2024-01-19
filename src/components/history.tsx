import { JobWithPaginatedHistory } from "../jobs";
import Html, { Children } from "@kitajs/html";
import Card from "./card";
import styled from "./styled";
import Table from "./table";
import { formatDate } from "../utils";
import colors from "tailwindcss/colors";
import { primaryHue } from "./theme";
import ActionButton from "./action-button";
import JobActions from "./job-actions";

type Props = { job: JobWithPaginatedHistory };
export default function History(props: Props) {
  const { job } = props;
  const { name, url, method, body, cronExpression, headers } = job;
  const {
    history: { data, ...pagination },
  } = job;

  return (
    <>
      <Card
        title={
          <Title>
            <div>{`${name} Details`}</div>
            <JobActions job={job} />
          </Title>
        }
      >
        <Grid>
          <GridItem title="http method">{method}</GridItem>
          <GridItem title="url">{url}</GridItem>
          <GridItem title="expression">{cronExpression}</GridItem>
          {headers && Object.keys(headers).length > 0 && (
            <GridItem title="content-type">
              {Object.keys(headers)
                .map((k) => `${k} : ${headers[k]}`)
                .join(" \n")}
            </GridItem>
          )}
          {body && <GridItem title="body">{body}</GridItem>}
        </Grid>

        <Table {...pagination} paginated>
          <thead>
            <tr>
              <th>Status</th>
              <th>Triggered At</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              (
                { response_ok, response_status, response_text, triggered_at },
                i
              ) => (
                <tr>
                  <ResponseColumn success={!!response_ok}>
                    {`${response_status}`}
                  </ResponseColumn>
                  <td>{formatDate(new Date(triggered_at))}</td>
                  <ResponseColumn success={!!response_ok}>
                    Response
                    <Dialog id={`d${i}`}>
                      <form method="dialog">
                        <CloseButton>
                          <CloseSVG />
                        </CloseButton>
                      </form>

                      <code>
                        {response_text
                          .replaceAll(">", "&gt;")
                          .replaceAll("<", "&lt;")}
                      </code>
                      <form method="dialog">
                        <button>OK</button>
                      </form>
                    </Dialog>
                    <ShowResponseButton id={`b${i}`}>
                      <ResponseSVG />
                    </ShowResponseButton>
                  </ResponseColumn>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </Card>
      <script type="text/javascript">{`
      for(var i = 0; i< 10; i++){
        const dialog = document.querySelector("#d"+i);
        const showButton = document.querySelector("#b"+i);

        showButton.addEventListener("click", () => {
          dialog.showModal();
        });
      }
        `}</script>
    </>
  );
}

const Title = styled("div")`
  display: flex;
  justify-content: space-between;
`;

const Grid = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;

type GridItemProps = {
  title: string;
  children: Children;
};
function GridItem({ title, children }: GridItemProps) {
  return (
    <GridItemContainer>
      <h5>{title}</h5>
      <h6>{children}</h6>
    </GridItemContainer>
  );
}

const GridItemContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 15px;

  & h5 {
    text-transform: uppercase;
    color: ${colors.neutral["600"]};
    margin: 0;
    font-size: 12px;
  }

  & h6 {
    margin: 0;
    font-weight: 500;
    font-size: 12px;
  }
`;

const ResponseColumn = styled<{ success: boolean }>("td")`
  &:is([success]) {
    color: ${colors.green["500"]};
  }

  &:not([success]) {
    color: ${colors.red["500"]};
  }

  display: flex;
  gap: 10px;
`;

const ShowResponseButton = styled("button")`
  & {
    margin-left: 20px;
    all: unset;
    cursor: pointer;
  }
`;

const Dialog = styled("dialog")`
  box-shadow: 1px 2px 4px 0px ${colors.neutral["300"]};
  border: none;
  border-radius: 22px;

  padding: 40px;

  max-width: 75vh;
  max-height: 75vh;

  background-color: ${colors.white};

  font-family: "Inter", sans-serif;
  word-break: break-all;

  &::backdrop {
    background: ${colors.neutral["900"]};
    opacity: 0.75;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ResponseSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="20px"
    height="20px"
    fill={colors[primaryHue]["500"]}
  >
    {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
    <path d="M168 80c-13.3 0-24 10.7-24 24V408c0 8.4-1.4 16.5-4.1 24H440c13.3 0 24-10.7 24-24V104c0-13.3-10.7-24-24-24H168zM72 480c-39.8 0-72-32.2-72-72V112C0 98.7 10.7 88 24 88s24 10.7 24 24V408c0 13.3 10.7 24 24 24s24-10.7 24-24V104c0-39.8 32.2-72 72-72H440c39.8 0 72 32.2 72 72V408c0 39.8-32.2 72-72 72H72zM176 136c0-13.3 10.7-24 24-24h96c13.3 0 24 10.7 24 24v80c0 13.3-10.7 24-24 24H200c-13.3 0-24-10.7-24-24V136zm200-24h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H376c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H376c-13.3 0-24-10.7-24-24s10.7-24 24-24zM200 272H408c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80H408c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
  </svg>
);

const CloseButton = styled("button")`
  all: unset;
  position: fixed;
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;

  cursor: pointer;
`;

const CloseSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30px"
    height="30px"
    fill="white"
    viewBox="0 0 384 512"
  >
    {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
  </svg>
);
