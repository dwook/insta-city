import React, { useEffect, useState, useRef } from "react";
import _ from "lodash";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { placeAction } from "feature/Place/slice";
const { kakao } = window;

const MapContainer = () => {
  const dispatch = useDispatch();
  const recentPlaces = useSelector((state) => state.place.recentPlaces);
  const placesByPoint = useSelector((state) => state.place.placesByPoint);
  const createdPlace = useSelector((state) => state.place.createdPlace);
  const [message, setMessage] = useState();
  const [map, setMap] = useState(null);
  const [currentLat, setCurrentLat] = useState(37.551279740966);
  const [currentLng, setCurrentLng] = useState(126.988217046052);
  const markerList = useRef([]);
  const overlayList = useRef([]);
  const placeIdList = useRef([]);

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
    console.log("디스이즈맵", map);
    setMap(map);

    dispatch(placeAction.getRecentPlacesRequest());
    dispatch(
      placeAction.getPlacesByPointRequest({ lat: currentLat, lng: currentLng })
    );
    placesByPoint.forEach((el) => {
      console.log("장소마커", el.kakao);
      new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.kakao.y, el.kakao.x),
        title: el.kakao.place_name,
      });
    });

    kakao.maps.event.addListener(
      map,
      "center_changed",
      _.debounce(function () {
        var level = map.getLevel();
        var latlng = map.getCenter();
        setCurrentLat(latlng.getLat());
        setCurrentLng(latlng.getLng());
        console.log(level, "위도", latlng.getLat(), "경도", latlng.getLng());
        dispatch(
          placeAction.getPlacesByPointRequest({
            lat: latlng.getLat(),
            lng: latlng.getLng(),
          })
        );
      }, 500)
    );
  }, []);

  useEffect(() => {
    placesByPoint.forEach((el) => {
      console.log("장소마커", el.kakao);
      if (!placeIdList.current.includes(el.id)) {
        placeIdList.current.push(el.id);
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(el.kakao.y, el.kakao.x),
        });
        markerList.current.push(marker);
        console.log(markerList, markerList.current, "마커", marker);

        const overlay = new kakao.maps.CustomOverlay({
          map: map,
          position: new kakao.maps.LatLng(el.kakao.y, el.kakao.x),
          content: `<div class="marker" data-id="${el.id}" onclick="window.browserHistory.push('/place/${el.id}');" style="background-image:url(${el.instagram.pic_url})">
          </div>`,
          yAnchor: 1,
        });
        overlayList.current.push(marker);
        console.log(overlayList, overlayList.current, "마커", overlay);
        console.log("아이디리스트", placeIdList.current);
      }
    });
    return () => {
      console.log("해제");
      markerList.current.forEach((el) => el.setMap(null));
      overlayList.current.forEach((el) => el.setMap(null));
      console.log(
        "해제종료",
        markerList.current,
        overlayList.current,
        placeIdList.current
      );
    };
  }, [placesByPoint, currentLat, currentLng]);

  useEffect(() => {
    dispatch(
      placeAction.getPlacesByPointRequest({ lat: currentLat, lng: currentLng })
    );
  }, [createdPlace]);

  return <Container id="map"></Container>;
};

export default MapContainer;

const Container = styled.div`
  max-width: 600px;
  width: 50%;
  height: 90vh;
  border-radius: 1rem;
`;
