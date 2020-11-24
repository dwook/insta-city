import { useState } from "react";
import styled from "styled-components";
import {
  Picture,
  NameContainer,
  AccountName,
  FullName,
} from "components/atoms/Profile";
import { Title } from "components/atoms/Typography";

const Place = ({ instagram, instagramInfo, instagramMedia, kakao }) => {
  return (
    <Container>
      <Profile>
        <Picture src={instagram.pic_url} alt={instagram.username} />
        <NameContainer>
          <AccountName>{instagram.username}</AccountName>
          <FullName>{instagram.fullname}</FullName>
        </NameContainer>
      </Profile>
      {kakao && (
        <Information>
          <strong>{kakao.place_name}</strong>
          <Group>
            <Row>
              <Title>지번</Title> {kakao.address_name}
            </Row>
            <Row>
              <Title>도로명</Title> {kakao.road_address_name}
            </Row>
          </Group>
        </Information>
      )}
      {instagramInfo && (
        <>
          <Information>
            <Row>
              <Title>팔로워</Title> {instagramInfo.followed}
            </Row>
            <Row>
              <Title>팔로잉</Title> {instagramInfo.follow}
            </Row>
          </Information>
          <ImageContainer>
            {instagramMedia &&
              instagramMedia.map((media) => (
                <Image key={media.node.id} src={media.node.display_url} />
              ))}
          </ImageContainer>
        </>
      )}
    </Container>
  );
};

export default Place;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  margin: 10px 0;
  border: 1px solid #dee2e6;
  border-radius: 0.2rem;
`;

const Profile = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2px 0;
`;

const Information = styled.div`
  padding-top: 10px;
  border-top: 1px solid #dee2e6;
  font-size: 0.8rem;
`;

const Group = styled.div`
  padding: 5px 0;
`;

const ImageContainer = styled.div`
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
`;

const ImageWrapper = styled.div`
  width: 24%;
  display: block;
  overflow: hidden;
  padding-bottom: 23%;
  margin-right: 1%;
  margin-bottom: 1%;
  position: relative;
`;

const ImageElement = styled.img`
  object-fit: cover;
  user-select: none;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 0.2rem;
`;

const Image = ({ key, src }) => {
  const [disabled, setDisabled] = useState(false);
  const handleImageError = () => {
    setDisabled(true);
  };
  if (disabled) return false;
  return (
    <ImageWrapper>
      <ImageElement key={key} src={src} onError={handleImageError} />
    </ImageWrapper>
  );
};
