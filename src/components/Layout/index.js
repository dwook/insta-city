import styled, { createGlobalStyle } from "styled-components";

const Layout = ({ children }) => {
  return (
    <Container>
      <GlobalStyle />
      {children}
    </Container>
  );
};

export default Layout;

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  }
  body {
    background: rgb(250,245,29);
    // background: linear-gradient(0deg, rgba(250,245,29,1) 0%, rgba(250,45,197,1) 50%, rgba(146,69,255,1) 100%);
  }
  .marker {
    width: 80px;
    height: 80px;
    overflow: hidden;
    background-size: cover;
    border-radius: 50%;
    border: 6px solid #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor:pointer;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;
