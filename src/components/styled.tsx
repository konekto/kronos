import Html from "@kitajs/html";

const hasher = new Bun.CryptoHasher("md5");

type TemplateStringValue<Props extends Record<string, any>> =
  | ((props: Props) => string | undefined | void)
  | string;

type ElementName = keyof JSX.IntrinsicElements;
type ElementProps = JSX.IntrinsicElements[ElementName];
type StyledInput = ElementName | JSX.Element;

function generateStyles<Props extends Record<string, any>>(
  InitialComponent: ElementName,
  strings: TemplateStringsArray,
  ...values: TemplateStringValue<Props>[]
) {
  //add typeof function and check for className
  const css = strings.reduce(
    (result, str, i) => result + str + (values[i] || ""),
    ""
  );
  const [className, style] = useStyle(css);

  const Component = (props: Props & ElementProps) => (
    <>
      <style>{style}</style>
      <tag
        {...props}
        of={InitialComponent}
        class={`${className} ${props.class ?? ""}`}
      >
        {props.children}
      </tag>
    </>
  );

  Component.className = `.${className}`;

  return Component;
}

const styled = <Props extends Record<string, any>>(Markup: ElementName) => {
  return (
    strings: TemplateStringsArray,
    ...values: TemplateStringValue<Props>[]
  ) => generateStyles<Props>(Markup, strings, ...values);
};
export default styled;

/**
 *
 * @param style
 * @returns [className, style]
 */
export function useStyle(style: string) {
  hasher.update(style);
  const className = "C" + hasher.digest("hex");
  const populatedStyles = `.${className} {
    ${style}
}`;
  return [className, populatedStyles] as const;
}
