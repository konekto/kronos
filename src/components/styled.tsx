import Html from "@kitajs/html";

const hasher = new Bun.CryptoHasher("md5");

type TemplateStringValue<Props extends Record<string, any>> =
  | ((props: Props) => string | undefined | void)
  | string;

type ElementName = keyof JSX.IntrinsicElements;

export function styled<Props extends Record<string, any>>(Markup: ElementName) {
  return (
    strings: TemplateStringsArray,
    ...values: TemplateStringValue<Props>[]
  ) => generateStyles<Props>(Markup, strings, ...values);
}

const stylesStore: Record<string, string> = {};

export function Styles() {
  return (
    <style>
      {Object.entries(stylesStore)
        .map(([className, styles]) => `.${className} {\n${styles}\n}`)
        .join("\n")}
    </style>
  );
}

type ElementProps = JSX.IntrinsicElements[ElementName];

function generateStyles<Props extends Record<string, any>>(
  InitialComponent: ElementName,
  strings: TemplateStringsArray,
  ...values: TemplateStringValue<Props>[]
) {
  const css = strings.reduce(
    (result, str, i) => result + str + getValue(values[i]),
    ""
  );
  const className = getClassName(css);

  const Component = (props: Props & ElementProps) => (
    <tag
      {...props}
      of={InitialComponent}
      class={`${className} ${props.class ?? ""}`}
    >
      {props.children}
    </tag>
  );

  Component.className = `.${className}`;

  return Component;
}

function getValue(v: any) {
  if (typeof v === "function" && v.className) {
    return v.className;
  }

  return v || "";
}

function getClassName(style: string) {
  hasher.update(style);
  const className = "C" + hasher.digest("hex");
  stylesStore[className] = style;

  return className;
}
