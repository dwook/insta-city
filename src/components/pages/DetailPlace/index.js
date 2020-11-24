import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { placeAction } from "feature/Place/slice";
import styled from "styled-components";
import Place from "components/organisms/Place";
import { Loading } from "components/atoms/Icon";

const DetailPlace = () => {
  const dispatch = useDispatch();
  const placesByPoint = useSelector((state) => state.place.placesByPoint);
  const accountMedia = useSelector((state) => state.place.accountMedia);
  let { place_id } = useParams();
  const [place] = placesByPoint.filter((place) => place.id === place_id);
  console.log("장소정보", place);

  useEffect(() => {
    if (place) {
      dispatch(placeAction.getAccountMediaRequest(place.instagram.username));
    }
  }, [place]);

  if (!place) {
    return (
      <Container justify="center" align="middle">
        <Loading />
      </Container>
    );
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

export default DetailPlace;

const Container = styled.div`
  width: 500px;
  height: 90vh;
  background-color: #fff;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.algin};
`;
