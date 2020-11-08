import React, { useEffect } from "react";
import styled from "styled-components";

const { kakao } = window;

const MapContainer = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.551279740966, 126.988217046052),
      level: 7,
    };
    const map = new kakao.maps.Map(container, options);
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
