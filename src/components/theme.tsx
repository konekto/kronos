import tailwindColors from "tailwindcss/colors";

export const colors = tailwindColors;
type Hue = keyof typeof colors;
export const primaryHue: Hue = "sky";
export const textHue: Hue = "zinc";
export const globalStyles = `
  
body {
    font-family: Work Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.26px;
    color: ${colors[textHue]["500"]};
    background: ${colors[primaryHue]["50"]};
    margin: 0px;
  }

  header {
    background: ${colors.white};
    color: ${colors[primaryHue]["500"]};
    padding: 10px 20px;
    height: 60px;
    vertical-align: center;

    font-size: 34px;
    font-style: normal;
    font-weight: 700;
    line-height: 60px;
    letter-spacing: -0.68px;
    box-shadow: 1px 2px 3px 0px ${colors[primaryHue]["100"]};
  }
`;
