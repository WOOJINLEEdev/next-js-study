import { ReactNode } from "react";
import styled from "styled-components";

const List = ({ children }: { children?: ReactNode }) => {
  return <ListContainer>{children}</ListContainer>;
};

export default List;

const ListContainer = styled.ul`
  max-width: 960px;
  min-height: calc(100vh - 191px);
  padding: 0 16px;
  margin: 0 auto;
  color: ${(props) => props.theme.colors.titleColor};
  background: ${(props) => props.theme.colors.bgColor};
  transition: ${(props) => props.theme.transitions[0]};
`;
