import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { placeAction } from "./slice";
import { H2, Description } from "components/atoms/Typography";
import { SearchInput } from "components/atoms/Input";
import { Button } from "components/atoms/Button";
import ProfileSelect from "components/organisms/ProfileSelect";
import AddressSelect from "components/organisms/AddressSelect";
import Place from "components/organisms/Place";

const CreatePlacePage = () => {
  const dispatch = useDispatch();
  const searchedAddresses = useSelector(
    (state) => state.place.searchedAddresses
  );
  const searchedAccounts = useSelector((state) => state.place.searchedAccounts);
  const accountInfo = useSelector((state) => state.place.accountInfo);
  const userInfo = useSelector((state) => state.user.userInfo);
  const createdPlace = useSelector((state) => state.place.createdPlace);
  const recentPlaces = useSelector((state) => state.place.recentPlaces);

  const [accountQuery, setAccountQuery] = useState("");
  const [accountListOpen, setAccountListOpen] = useState(false);

  const [addressQuery, setAddressQuery] = useState("");
  const [addressListOpen, setAddressListOpen] = useState(false);

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [placeToCreate, setPlaceToCreate] = useState({});


  useEffect(() => {
    if (accountQuery) {
      dispatch(placeAction.searchAccountRequest(accountQuery));
    }
  }, [accountQuery]);

  useEffect(() => {
    if (addressQuery) {
      dispatch(placeAction.searchAddressRequest(addressQuery));
    }
  }, [addressQuery]);

  useEffect(() => {
    if (createdPlace) {
      setPlaceToCreate({});
      setSelectedAccount(null);
      setSelectedAddress(null);
    }
  }, [createdPlace]);

  const onAccountQueryChange = (event) => {
    setAccountQuery(event.target.value);
    setAccountListOpen(true);
  };

  const searchAccount = (event) => {
    event.preventDefault();
    setSelectedAccount(null);
    dispatch(placeAction.searchAccountRequest(accountQuery));
  };

  const onAccountClick = (username) => {
    const [result] = searchedAccounts.filter(
      (account) => account.username === username
    );
    setSelectedAccount(result);
    dispatch(placeAction.getAccountInfoRequest(username));
    setAccountListOpen(false);
    setAccountQuery("");
    setPlaceToCreate({
      ...placeToCreate,
      instagram: result,
      instagramInfo: accountInfo,
    });
  };

  const onAddressQueryChange = (event) => {
    setAddressQuery(event.target.value);
    setAddressListOpen(true);
  };

  const searchAddress = (event) => {
    event.preventDefault();
    dispatch(placeAction.searchAddressRequest(addressQuery));
  };

  const onAddressClick = (id) => {
    const [result] = searchedAddresses.filter((address) => address.id === id);
    setSelectedAddress(result);
    console.log(id, result);
    setAddressListOpen(false);
    setAddressQuery("");
    setPlaceToCreate({ ...placeToCreate, kakao: result });
  };

  const onPlaceClick = (event) => {
    event.preventDefault();
    dispatch(
      placeAction.createPlaceRequest({
        ...placeToCreate,
        instagramInfo: accountInfo,
        user: userInfo,
      })
    );
  };

  return (
    <Container>
      <H2>장소등록</H2>
      <Section>
        <Description>
          1. 등록하고 싶은 장소의 인스타그램 계정을 입력해주세요.
        </Description>
        <SearchInput
          label="인스타그램 계정"
          type="text"
          name="account"
          value={accountQuery}
          onSubmit={searchAccount}
          onChange={onAccountQueryChange}
        >
          {accountListOpen &&
            searchedAccounts.map((account) => (
              <ProfileSelect
                {...account}
                key={account.id}
                onClick={onAccountClick}
              />
            ))}
        </SearchInput>
        <Description>
          2. 등록하고 싶은 장소의 상호명을 검색하고 정확한 주소를 선택해주세요.
        </Description>
        <SearchInput
          label="장소"
          type="text"
          name="place"
          value={addressQuery}
          onSubmit={searchAddress}
          onChange={onAddressQueryChange}
        >
          {addressListOpen &&
            searchedAddresses.map((address) => (
              <AddressSelect
                {...address}
                key={address.id}
                onClick={onAddressClick}
              />
            ))}
        </SearchInput>
      </Section>
      {selectedAccount && (
        <Section>
          <Place
            instagram={selectedAccount}
            instagramInfo={accountInfo}
            kakao={selectedAddress}
          />
          <Button onClick={onPlaceClick}>장소등록</Button>
        </Section>
      )}
      {recentPlaces.length &&
        recentPlaces.map((place) => {
          <div>{place}</div>;
        })}
    </Container>
  );
};

export default CreatePlacePage;

const Container = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  padding: 1rem;
`;

const Section = styled.div`
  border-radius: 0.2rem;
  position: relative;
`;
