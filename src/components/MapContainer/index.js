import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { placeAction } from "feature/Place/slice";
const { kakao } = window;

const MapContainer = () => {
  const dispatch = useDispatch();
  const recentPlaces = useSelector((state) => state.place.recentPlaces);
  const [message, setMessage] = useState();
  const [currentLat, setCurrentLat] = useState(37.551279740966);
  const [currentLng, setCurrentLng] = useState(126.988217046052);

  useEffect(() => {
    const container = document.getElementById("map");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLat(position.coords.latitude);
        setCurrentLng(position.coords.longitude);
      });
    }
    const options = {
      center: new kakao.maps.LatLng(currentLat, currentLng),
      level: 7,
    };
    const map = new kakao.maps.Map(container, options);

    dispatch(placeAction.getRecentPlacesRequest());
    recentPlaces.forEach((el) => {
      console.log(el.kakao);
      new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.kakao.y, el.kakao.x),
        title: el.kakao.place_name,
      });
    });
  }, []);

  return <Container id="map"></Container>;
};

export default MapContainer;

const Container = styled.div`
  max-width: 600px;
  width: 50%;
  height: 90vh;
  border-radius: 1rem;
`;
