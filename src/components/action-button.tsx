import Html, { Children } from "@kitajs/html";
import { styled } from "./styled";

type Input = {
  name: string;
  value: string;
};
type Props = {
  fields: Input[];
  method: "get" | "post" | "put";
  action: string;
  children: Children;
  title?: string;
};

export default function ActionButton(props: Props) {
  const { fields, method, action, title, children } = props;

  return (
    <Form method={method} title={title}>
      <input type="text" name="action" value={action} hidden />
      {fields.map(({ value, name }) => (
        <input type="text" name={name} value={value} hidden />
      ))}

      <Button type="submit" />
      {children}
    </Form>
  );
}

const Form = styled("form")`
  position: relative;

  width: fit-content;
  height: fit-content;
`;

const Button = styled("input")`
  position: absolute;
  inset: 0;

  min-height: 0;
  min-width: 0;

  z-index: 1;
  opacity: 0;
  cursor: pointer !important;
`;
