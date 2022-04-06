import styled from "styled-components";

const Footer = () => {
  return (
    <Container className="footer">
      <nav aria-label="footer navigation">
        <ul className="footer_menu">
          <li className="footer_menu_list">이용약관</li>
          <li className="footer_menu_list">개인정보처리방침</li>
          <li className="footer_menu_list">카페 고객센터</li>
          <li className="footer_menu_list">오류신고</li>
        </ul>
      </nav>
      <address className="footer_address">주소: OO시 OO구 OOO로</address>
      <p className="footer_copyright">
        © <span className="footer_copyright_text">WOOJINLEEdev</span>
      </p>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  width: 100%;
  margin: 0 auto;
  font-size: 12px;
  background: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.titleColor};
  border-top: 2px solid #efefef;
  padding-bottom: 47px;

  & .footer_menu {
    display: table;
    padding: 15px 0;
    margin: 0 auto;
  }

  & .footer_menu:after {
    display: block;
    clear: both;
    content: "";
  }

  & .footer_menu_list {
    float: left;
  }

  & .footer_menu_list + .footer_menu_list {
    padding-left: 10px;
  }

  & .footer_link {
    text-decoration: none;
    color: #333;
  }

  & .footer_address {
    text-align: center;
    padding-bottom: 10px;
  }

  & .footer_copyright {
    display: table;
    padding-bottom: 15px;
    margin: 0 auto;
  }

  & .footer_copyright_text {
    padding-right: 5px;
    font-weight: bold;
  }
`;
