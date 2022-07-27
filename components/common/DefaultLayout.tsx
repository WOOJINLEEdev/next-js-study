import { ReactElement } from "react";

import Footer from "components/common/Footer";
import Header from "components/common/Header";
import Menu from "components/common/Menu";

export interface IDefaultLayoutProps {
  children: ReactElement;
  scrollState: boolean;
  cafeTitle: string;
}

const DefaultLayout = ({
  children,
  scrollState,
  cafeTitle,
}: IDefaultLayoutProps) => {
  return (
    <>
      <Header scrollState={scrollState} cafeTitle={cafeTitle} />
      <Menu />
      {children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
