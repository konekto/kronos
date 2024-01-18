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
  const populatedStyles = populateClassPrefix(style, className);

  return [className, populatedStyles] as const;
}

function populateClassPrefix(style: string, className: string) {
  let res = style;
  let i = -1;
  let lastIndex = -1;
  let j = 0;

  while (i < res.length) {
    i = res.indexOf("{", i + 1);

    if (i < 0) {
      break;
    }

    if (i === 0) {
      res = `& ${res}`;
      i += 2;
      lastIndex = i;
      continue;
    }

    if (i === lastIndex) {
      break;
    }

    j = i - 1;
    while (j >= lastIndex) {
      if (res[j] === "&") {
        break;
      }

      if (res[j] === ";" || res[j] === "}") {
        res = res.substring(0, j + 1) + "\n& " + res.substring(j + 1);
        i += 3;
        lastIndex = i;
      }
      j--;
    }
  }

  return `.${className} {
    ${res}
}`;
}

function isNative(input: StyledInput): input is ElementName {
  if (typeof input === "string") {
    return true;
  }

  return false;
}
