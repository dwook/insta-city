import styled from "styled-components";

export const Picture = styled.img`
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.0975);
  width: 56px;
  height: 56px;
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

export const AccountName = styled.div`
  font-weight: bold;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  width: 150px;
`;

export const FullName = styled.div`
  margin-top: 2px;
  color: #868e96;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  width: 150px;
`;
