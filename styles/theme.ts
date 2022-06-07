export interface ITheme {
  theme?: {
    colors?: {
      titleColor?: string;
      bgColor?: string;
      boxColor?: string;
      tabBorderColor?: string;
      dimmedColor?: string;
      editorBgColor?: string;
      editorTitleColor?: string;
    };
  };
}

export const dark = {
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

export const light = {
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
