import styled from "styled-components";

const Footer = () => {
  const footerList = ["이용약관", "개인정보처리방침", "고객센터", "오류신고"];

  return (
    <Container className="footer">
      <nav aria-label="footer navigation">
        <ul className="footer_list">
          {footerList.map((item, i) => {
            return (
              <li key={`footer_item_${i}`} className="footer_item">
                {item}
              </li>
            );
          })}
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
  padding-bottom: 47px;
  margin: 0 auto;
  font-size: 12px;
  border-top: 2px solid #efefef;
  color: ${(props) => props.theme.colors.titleColor};
  background: ${(props) => props.theme.colors.bgColor};
  transition: ${(props) => props.theme.transitions[0]};

  .footer_list {
    display: table;
    padding: 15px 0;
    margin: 0 auto;
  }

  .footer_list:after {
    display: block;
    clear: both;
    content: "";
  }

  .footer_item {
    float: left;
  }

  .footer_item + .footer_item {
    padding-left: 10px;
  }

  .footer_link {
    text-decoration: none;
    color: #333;
  }

  .footer_address {
    text-align: center;
    padding-bottom: 10px;
  }

  .footer_copyright {
    display: table;
    padding-bottom: 15px;
    margin: 0 auto;
  }

  .footer_copyright_text {
    padding-right: 5px;
    font-weight: bold;
  }
`;
