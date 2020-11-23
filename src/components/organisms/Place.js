import styled from "styled-components";
import { Picture, Name, FullName } from "components/atoms/Profile";
import { Title } from "components/atoms/Typography";

const Place = ({ instagram, instagramInfo, instagramMedia, kakao }) => {
  const handleImageError = (e) => {
    e.target.style.display = "none";
  };

  return (
    <Container>
      <Profile>
        <Picture src={instagram.pic_url} alt={instagram.username} />
        <Name>
          <strong>{instagram.username}</strong>
          <FullName>{instagram.fullname}</FullName>
        </Name>
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
                <Image
                  key={media.node.id}
                  src={media.node.display_url}
                  onError={handleImageError}
                />
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

const Image = styled.img`
  width: 23%;
  max-height: 23%;
  border-radius: 0.2rem;
  margin: 1%;
`;
