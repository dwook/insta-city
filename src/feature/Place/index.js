import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { placeAction } from "./slice";
import { H2, Description } from "components/atoms/Typography";
import { Input } from "components/atoms/Input";
import { Button } from "components/atoms/Button";

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
    <Container>
      <H2>장소등록</H2>
      <Description>
        1. 등록하고 싶은 장소의 인스타그램 계정을 입력해주세요.
      </Description>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="">인스타그램 계정</label>
          <Input
            type="text"
            name="instaAccount"
            value={instaAccount}
            onChange={onChange}
            placeholder="@"
          />
          <Button>확인</Button>
        </div>
      </form>
      <Description>
        2. 등록하고 싶은 장소의 상호명을 검색하고 정확한 주소를 선택해주세요.
      </Description>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="">장소</label>
          <Input
            type="text"
            name="place"
            value={placeQuery}
            onChange={onChange}
          />
          <Button>검색</Button>
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
    </Container>
  );
};

export default CreatePlacePage;

const Container = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  padding: 1rem;
`;
