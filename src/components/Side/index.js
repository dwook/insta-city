import styled from "styled-components";
import Auth from "feature/User";
import CreatePlacePage from "feature/Place";

function Side() {
  return (
    <Container>
      <Auth />
      <CreatePlacePage />
    </Container>
  );
}

export default Side;

const Container = styled.div`
  width: 450px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
