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
  body {
    padding: 1rem;
    background: rgb(250,245,29);
    // background: linear-gradient(0deg, rgba(250,245,29,1) 0%, rgba(250,45,197,1) 50%, rgba(146,69,255,1) 100%);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;
