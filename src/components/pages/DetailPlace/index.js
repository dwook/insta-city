import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { placeAction } from "feature/Place/slice";
import styled from "styled-components";
import {
  Picture,
  NameContainer,
  AccountName,
  FullName,
} from "components/atoms/Profile";
import { Title } from "components/atoms/Typography";
import { Loading } from "components/atoms/Icon";

const DetailPlace = () => {
  const dispatch = useDispatch();
  const placesByPoint = useSelector((state) => state.place.placesByPoint);
  // const accountMedia = useSelector((state) => state.place.accountMedia);
  let { place_id } = useParams();
  const [place] = placesByPoint.filter((place) => place.id === place_id);
  console.log("장소정보", place);

  // useEffect(() => {
  //   if (place) {
  //     dispatch(placeAction.getAccountMediaRequest(place.instagram.username));
  //   }
  // }, [place]);

  if (!place) {
    return (
      <Container justify="center" align="middle">
        <Loading />
      </Container>
    );
  }

  const { instagram, instagramInfo, kakao } = place;
  return (
    <Container>
      {placesByPoint.map((place) => {
        const { instagram, instagramInfo, kakao } = place;
        return (
          <Card>
            <Media>
              <ImageContainer>
                {instagramInfo.media &&
                  instagramInfo.media.map((media) => (
                    <Image key={media.node.id} src={media.node.display_url} />
                  ))}
              </ImageContainer>
            </Media>
            <Info>
              <Profile>
                <Picture src={instagram.pic_url} alt={instagram.username} />
                <NameContainer>
                  <AccountName>{instagram.username}</AccountName>
                  <FullName>{instagram.fullname}</FullName>
                </NameContainer>
              </Profile>
              <a
                href={`https://place.map.kakao.com/${kakao.id}`}
                target="_blank"
                rel="noreferrer"
              >
                <Information>
                  <strong>{kakao.place_name}</strong>
                  <div>{kakao.road_address_name}</div>
                </Information>
              </a>
            </Info>
            <Comment></Comment>
          </Card>
        );
      })}
    </Container>
  );
};

export default DetailPlace;

const Container = styled.div`
  width: 990px;
  height: 90vh;
  display: flex;
  flex-wrap: nowrap;
  overflow-y: auto;
  flex-direction: column;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: y mandatory;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.algin};
  @media only screen and (max-width: 768px) {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 100;
    height: 50vh;
  }
`;

const Card = styled.div`
  flex: 0 0 330px;
  scroll-snap-align: start;
  border-radius: 1rem;
  background-color: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;
const Media = styled.div`
  width: 33.33%;
  overflow-y: scroll;
  background-color: #fff;
  @media only screen and (max-width: 768px) {
    width: 50%;
  }
`;
const Info = styled.div`
  width: 33.33%;
  background-color: #fff;
  @media only screen and (max-width: 768px) {
    width: 50%;
  }
`;
const Comment = styled.div`
  width: 33.33%;
  background-color: #fff;
  @media only screen and (max-width: 768px) {
    width: 0%;
  }
`;

const ImageContainer = styled.div`
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
`;

const ImageWrapper = styled.div`
  width: 31%;
  display: block;
  overflow: hidden;
  padding-bottom: 31%;
  margin-right: 2%;
  margin-bottom: 2%;
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

const Profile = styled.div`
  display: flex;
  margin: 10px;
`;

const Information = styled.div`
  margin: 10px;
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 0.2rem;
  font-size: 0.8rem;
`;
