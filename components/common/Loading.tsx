import styled from "styled-components";
import { SpinnerCircular } from "spinners-react";

const Loading = () => {
  return (
    <LoadingContainer>
      <SpinnerCircular color={"#efefef"} />
    </LoadingContainer>
  );
};

export default Loading;

const LoadingContainer = styled.div`
  z-index: 99;
  position: fixed;
  top: 0px;
  left: 0px;
  display: block;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  text-align: center;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
`;
