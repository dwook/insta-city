import styled from "styled-components";
import Auth from "components/pages/AuthPage";
import CreatePlacePage from "components/pages/CreatePlace";

function AdminPage() {
  return (
    <Container>
      <Auth />
      <CreatePlacePage />
    </Container>
  );
}

export default AdminPage;

const Container = styled.div`
  width: 500px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
