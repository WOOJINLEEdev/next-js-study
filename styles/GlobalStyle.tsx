import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    width: 100%;
    min-height: 100%;
    color: ${(props) => props.theme.colors.titleColor};
    background: ${(props) => props.theme.colors.bgColor};
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, sans-serif;
    transition: ${(props) => props.theme.transitions[0]};
    -ms-overflow-style: none;
  }

  body::-webkit-scrollbar {
    display: none;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  input,
  button {
    background-color: transparent;
    border: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Maven Pro", sans-serif;
  }

  a,
  button {
    cursor: pointer;
  }

  a:focus-visible,
  button:focus-visible {
    outline: 3px solid #000;
    border-radius: 6px;
    box-shadow: 0 0 0 7px rgba(255, 255, 255, 0.9);
  }

  a:focus:not(:focus-visible),
  button:focus:not(:focus-visible) {
    outline: 0;
  }

  input:focus {
    outline: 0;
  }

  .visually_hidden {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: 0;
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
  }
`;

export default GlobalStyle;
