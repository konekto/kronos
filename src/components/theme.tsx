import tailwindColors from "tailwindcss/colors";

export const colors = tailwindColors;
type Hue = keyof typeof colors;
export const primaryHue: Hue = "sky" as const;
export const accentHue: Hue = "purple" as const;
export const textHue: Hue = "zinc" as const;
export const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&family=Open+Sans&display=swap');
body {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.26px;
    color: ${colors[textHue]["500"]};
    background: ${colors[primaryHue]["50"]};
    margin: 0px;
  }
`;
