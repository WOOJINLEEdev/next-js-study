const darkTheme = {
  colors: {
    titleColor: "#b8b8b8",
    bgColor: "#333333",
    boxColor: "#808080",
    borderColor: "1px solid #e6e6e6",
    tabBorderColor: "3px solid #e6e6e6",
    dimmedColor: "rgba(255, 255, 255, 0.1)",
    editorBgColor: "#000000",
    editorTitleColor: "#ffffff",
  },
};

const lightTheme = {
  colors: {
    titleColor: "#333333",
    bgColor: "#ffffff",
    boxColor: "#ffffff",
    borderColor: "1px solid #e6e6e6",
    tabBorderColor: "3px solid #333333",
    dimmedColor: "rgba(0, 0, 0, 0.2)",
    editorBgColor: "#ffffff",
    editorTitleColor: "#000000",
  },
};

const defaultTheme = {
  fontSizes: ["14px", "16px", "18px", "22px", "26px", "32px", "40px"],
  transitions: ["all 0.2s linear", "max-height 0.2s ease-in-out"],
  zIndices: ["-1", "1", "10", "100", "1000"],
};

export const light = { ...defaultTheme, ...lightTheme };
export const dark = { ...defaultTheme, ...darkTheme };
