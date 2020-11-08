import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeAction } from "./slice";

const CreatePlacePage = () => {
  const dispatch = useDispatch();
  const searchedPlaces = useSelector((state) => state.place.searchedPlaces);
  const [instaAccount, setInstaAccount] = useState("");
  const [placeQuery, setPlaceQuery] = useState("");

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setPlaceQuery(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(placeAction.searchPlaceRequest(placeQuery));
  };

  return (
    <div>
      <h1>장소등록</h1>
      <p>1단계. 인스타그램 계정확인</p>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="">인스타그램 계정</label>
          <input
            type="text"
            name="instaAccount"
            value={instaAccount}
            onChange={onChange}
          />
          <input type="submit" value="확인" />
        </div>
      </form>
      <p>2단계. 카카오 장소검색</p>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="">장소</label>
          <input
            type="text"
            name="place"
            value={placeQuery}
            onChange={onChange}
          />
          <input type="submit" value="검색" />
        </div>
      </form>
      <div>
        {searchedPlaces.map((place) => (
          <div key={place.id}>
            <p>{place.place_name}</p>
            <p>
              <span>지번주소</span> {place.address_name}
            </p>
            <p>
              <span>도로명주소</span> {place.road_address_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatePlacePage;
