import styled from "styled-components";
import { Picture, Name, FullName } from "components/atoms/Profile";

const ProfileSelect = ({ pic_url, username, fullname, onClick }) => {
  return (
    <Container onClick={() => onClick(username)}>
      <Picture src={pic_url} alt={username} />
      <Name>
        <strong>{username}</strong>
        <FullName>{fullname}</FullName>
      </Name>
    </Container>
  );
};
export default ProfileSelect;

const Container = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
  cursor: pointer;
  background-color: #fff;
  &:hover {
    background-color: #f1f3f5;
  }
`;
