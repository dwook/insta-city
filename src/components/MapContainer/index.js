import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { placeAction } from "feature/Place/slice";
const { kakao } = window;

const MapContainer = () => {
  const dispatch = useDispatch();
  const recentPlaces = useSelector((state) => state.place.recentPlaces);
  const [message, setMessage] = useState();
  const map = useRef();
  const [currentLat, setCurrentLat] = useState(37.551279740966);
  const [currentLng, setCurrentLng] = useState(126.988217046052);

  useEffect(() => {
    dispatch(placeAction.getRecentPlacesRequest());
  }, []);

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
    map.current = new kakao.maps.Map(container, options);

    for (let i = 0; i < recentPlaces.length; i++) {
      displayMarker(recentPlaces[i]);
      console.log(recentPlaces[i].kakao);
    }
  }, [currentLat, currentLng, recentPlaces.length]);

  function displayMarker(place, message) {
    let marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
    });

    let iwContent = message,
      iwRemoveable = true;

    var infowindow = new kakao.maps.infoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    infowindow.open(map, marker);
    map.setCenter(place);
  }

  return <Container id="map"></Container>;
};

export default MapContainer;

const Container = styled.div`
  max-width: 600px;
  width: 50%;
  height: 90vh;
  border-radius: 1rem;
`;
