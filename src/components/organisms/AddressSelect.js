import styled from "styled-components";
import { Title } from "components/atoms/Typography";

const AddressSelect = ({
  id,
  place_name,
  address_name,
  road_address_name,
  onClick,
}) => {
  return (
    <Container onClick={() => onClick(id)}>
      <strong>{place_name}</strong>
      <Group>
        <Row>
          <Title>지번</Title> {address_name}
        </Row>
        <Row>
          <Title>도로명</Title> {road_address_name}
        </Row>
      </Group>
    </Container>
  );
};

export default AddressSelect;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
  background-color: #fff;
  cursor: pointer;
  font-size: 0.8rem;
  &:hover {
    background-color: #f1f3f5;
  }
`;

const Group = styled.div`
  padding: 2px 0;
`;

const Row = styled.div`
  padding: 2px 0;
`;
