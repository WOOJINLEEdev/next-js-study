import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fontSizes: string[];
    transitions: string[];
    zIndices: string[];
    colors: {
      titleColor: string;
      bgColor: string;
      boxColor: string;
      borderColor: string;
      tabBorderColor: string;
      dimmedColor: string;
      editorBgColor: string;
      editorTitleColor: string;
    };
  }
}
