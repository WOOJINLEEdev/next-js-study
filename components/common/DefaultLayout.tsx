import { ReactElement } from "react";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import Menu from "components/common/Menu";

export interface DefaultLayoutProps {
  children: ReactElement;
  scrollStatus: boolean;
  cafeTitle: string;
}

const DefaultLayout = ({
  children,
  scrollStatus,
  cafeTitle,
}: DefaultLayoutProps) => {
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
