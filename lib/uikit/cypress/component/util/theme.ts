const defaultColors = {
  text: '#000000',
  navText: '#ffffff',
  navActiveText: '#00ffff',
  navHoverText: '#00ffff',
  navColor: '#008b8b',
  navHoverColor: '#009f9f',
  buttonText: '#ffffff',
  buttonBG: '#a9a9a9',
  buttonBorder: '#333333',
  dButtonText: '#dedede',
  dButtonBG: '#a9a9a9',
  dButtonBorder: '#333333',
  hButtonText: '#ffffff',
  hButtonBG: '#7f7f7f',
  hButtonBorder: '#333333',
  sButtonText: '#ffffff',
  sButtonBG: '#0000ff',
  sButtonBorder: '#0000ff',
  sdButtonText: '#ffffff',
  sdButtonBG: '#00ff00',
  sdButtonBorder: '#00ff00',
  shButtonText: '#ffffff',
  shButtonBG: '#00007f',
  shButtonBorder: '#0000ff',
  divider: '#000000',
  tabColor: '#ffffff',
  tabTextColor: '#000000',
  tabSelectedColor: '#0000ff',
  tabTextSelectedColor: '#ffffff',
  tabLineColor: '#0000ff',
  tableColorEven: '#f0f8ff',
  tableColorOdd: '#ffffe0',
  tableColorBorderHover: '#0000f8',
  barColor: '#b0c4de',
};

function generateTheme (colors) {
  return {
    contentWidth: '768px',
    contentPadding: '0 0 0 0',

    colors,

    variant: {
      buttonDefault: `
        color: ${colors.buttonText};
        background-color: ${colors.buttonBG};
        border: 1px solid ${colors.buttonBorder};
        &:hover {
          color: ${colors.hButtonText};
          background-color: ${colors.hButtonBG};
          border-color: ${colors.hButtonBorder};
        }
        &:disabled {
          color: ${colors.dButtonText};
          background-color: ${colors.dButtonBG};
          border-color: ${colors.dButtonBorder};
        }
      `,
      buttonSubmit: `
        color: ${colors.sButtonText};
        background-color: ${colors.sButtonBG};
        border: 1px solid ${colors.sButtonBorder};
        &:hover {
          color: ${colors.shButtonText};
          background-color: ${colors.shButtonBG};
          border-color: ${colors.shButtonBorder};
        }
        &:disabled {
          color: ${colors.sdButtonText};
          background-color: ${colors.sdButtonBG};
          border-color: ${colors.sdButtonBorder};
        }
      `,
    },

    buttonSize: {
      xs: `
        font-size: 0.75rem;
        padding: 2px 4px;
      `,
      sm: `
        font-size: 1rem;
        padding: 4px 8px;
      `,
      md: `
        font-size: 1.25rem;
        padding: 6px 12px;
      `,
      lg: `
        font-size: 1.5rem;
        padding: 6px 12px;
      `,
    },

    fontSize: ['10px', '12px', '14px', '16px', '18px', '22px', '26px'],

    // Field customization
    fieldBase2: `
      border: 1px solid darkgray;
      border-radius: 4px;
      margin-top: 12px;
    `,
    fieldElement2: `
      margin: 0 0 6px 4px;
      width: calc(100% - 8px);
      background-color: white;
    `,
    fieldLabel2: `
      display: block;
      float: left;
      margin: -12px 0 6px 4px;
      height: 16px;
      padding: 2px 5px 2px 5px;
      font-size: 14px;
      background-color: white;
      overflow: hidden;

      > * {
        clear: left;
      }
    `,
    fieldError2: `
      font-size: 14px;
      padding: 3px 8px;
      color: red;
      background-color: lightgray;
    `,
    fieldInfo2: `
      font-size: 14px;
      padding: 3px 8px;
      background-color: lightgray;
    `,
  };
}

export const theme = generateTheme (defaultColors);
