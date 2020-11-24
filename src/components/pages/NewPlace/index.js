import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { H2 } from "components/atoms/Typography";
import AccountSelect from "components/organisms/AccountSelect";
import { Loading } from "components/atoms/Icon";

function NewPlace() {
  const recentPlaces = useSelector((state) => state.place.recentPlaces);
  const recentPlacesLoading = useSelector(
    (state) => state.place.getRecentPlacesLoading
  );

  if (recentPlacesLoading) {
    return (
      <Container justify="center" align="middle">
        <Loading />
      </Container>
    );
  }

  return (
    <Container>
      <H2>New</H2>
      <div>
        {recentPlaces.map((place) => (
          <AccountSelect {...place.instagram} key={place.id} onClick />
        ))}
      </div>
    </Container>
  );
}

export default NewPlace;

const Container = styled.div`
  width: 300px;
  height: 90vh;
  border-radius: 1rem;
  background-color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.algin};
  flex-direction: column;
`;
