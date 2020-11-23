import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { placeAction } from "feature/Place/slice";
import styled from "styled-components";
import Place from "components/organisms/Place";

const PlaceDetail = () => {
  const dispatch = useDispatch();
  const placesByPoint = useSelector((state) => state.place.placesByPoint);
  const accountMedia = useSelector((state) => state.place.accountMedia);
  let { place_id } = useParams();
  const [place] = placesByPoint.filter((place) => place.id === place_id);
  console.log("장소정보", place);

  useEffect(() => {
    if (place) {
      // dispatch(
      //   placeAction.getAccountMediaRequest(place.instagram.username)
      // );
    }
  }, [place]);

  if (!place) {
    return <div>로딩중</div>;
  }

  return (
    <Container>
      <Place
        {...place}
        instagramMedia={
          accountMedia ? accountMedia.media : place.instagramInfo.media
        }
      />
    </Container>
  );
};

export default PlaceDetail;

const Container = styled.div`
  width: 500px;
  background-color: #fff;
  border-radius: 1rem;
  padding: 1rem;
`;
