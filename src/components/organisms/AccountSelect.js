import styled from "styled-components";
import {
  Picture,
  NameContainer,
  AccountName,
  FullName,
} from "components/atoms/Profile";

const AccountSelect = ({ pic_url, username, fullname, onClick }) => {
  return (
    <Container onClick={() => onClick(username)}>
      <Picture src={pic_url} alt={username} />
      <NameContainer>
        <AccountName>{username}</AccountName>
        <FullName>{fullname}</FullName>
      </NameContainer>
    </Container>
  );
};
export default AccountSelect;

const Container = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
  cursor: pointer;
  background-color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    background-color: #f1f3f5;
  }
`;
