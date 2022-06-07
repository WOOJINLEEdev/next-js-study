import { ReactElement } from "react";

import Footer from "components/common/Footer";
import Header from "components/common/Header";
import Menu from "components/common/Menu";

export interface IDefaultLayoutProps {
  children: ReactElement;
  scrollStatus: boolean;
  cafeTitle: string;
}

const DefaultLayout = ({
  children,
  scrollStatus,
  cafeTitle,
}: IDefaultLayoutProps) => {
  return (
    <>
      <Header scrollStatus={scrollStatus} cafeTitle={cafeTitle} />
      <Menu />
      {children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
