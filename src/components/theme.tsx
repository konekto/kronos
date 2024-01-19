export const greenColor = "#59d499";
export const pinkColor = "#e879f9";
export const stdColor = "rgb(247, 248, 248)";
export const stdBg = "#000212";
export const grayColor = "rgb(180, 188, 208)";

export const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
body {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: ${stdColor};
    background: ${stdBg};
    margin: 0px;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
        opacity: 1;
    }
  }

  @keyframes hide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
