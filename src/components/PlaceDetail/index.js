import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

const PlaceDetail = () => {
  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    console.log("로케이션", currentPath, searchParams);
  }, [location]);
  let { place_id } = useParams();
  console.log("플레이스", place_id);
  return <div>플레이스 {place_id}</div>;
};

export default PlaceDetail;
