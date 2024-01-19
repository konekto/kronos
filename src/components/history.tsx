import { JobWithPaginatedHistory } from "../jobs";
import Html, { Children } from "@kitajs/html";
import Card from "./card";
import { styled } from "./styled";
import Table from "./table";
import { formatDate } from "../utils";
import JobActions from "./job-actions";
import { greenColor, pinkColor } from "./theme";

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
            <div>{name}</div>
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
                  <td>
                    <Dialog id={`d${i}`}>
                      <form method="dialog">
                        <CloseButton>
                          <CloseSVG />
                        </CloseButton>
                      </form>

                      <Code>
                        {response_text
                          .replaceAll(">", "&gt;")
                          .replaceAll("<", "&lt;")}
                      </Code>
                      <ButtonContainer method="dialog">
                        <Button>OK</Button>
                      </ButtonContainer>
                    </Dialog>
                    <ShowResponseButton id={`b${i}`}>
                      <ResponseSVG />
                    </ShowResponseButton>
                  </td>
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
  margin-bottom: 20px;
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
    color: ${greenColor};
  }

  &:not([success]) {
    color: ${pinkColor};
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
  box-shadow: 1px 2px 4px 0px rgba(black, 0.3);
  border: none;
  border-radius: 22px;
  padding: 40px;
  max-width: 75vw;
  max-height: 75vh;
  background-color: white;
  opacity: 0;
  font-family: "Inter", sans-serif;
  word-break: break-all;

  &[open] {
    animation: show 0.8s ease forwards;
  }

  &::backdrop {
    backdrop-filter: blur(10px) opacity(1);
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Code = styled("code")`
  display: block;
  max-height: calc(75vh - 55px);
  overflow: auto;
`;

const ButtonContainer = styled("form")`
  display: flex;
`;

const Button = styled("button")`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(94, 106, 210, 0.9);
  color: white;
  padding: 0 10px;
  height: 40px;
  border-radius: 30px;
  border: none;
  min-width: 100px;
  font-weight: 400;
  margin-top: 30px;
  margin-left: auto;
  cursor: pointer;

  &:hover {
    background: rgba(94, 106, 210, 1);
  }
`;

const ResponseSVG = () => (
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
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const CloseButton = styled("button")`
  all: unset;
  position: fixed;
  top: 15px;
  right: 15px;
  padding: 10px;

  cursor: pointer;
`;

const CloseSVG = () => (
  <svg
    viewBox="0 0 24 24"
    width="30"
    height="30"
    stroke="white"
    stroke-width="2"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="css-i6dzq1"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
