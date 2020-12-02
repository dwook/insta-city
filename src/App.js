import React from "react";
import { Provider } from "react-redux";
import createStore from "./store";
import { Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Map from "components/pages/Map";
import Side from "components/pages/AdminPage";
import NewPlace from "components/pages/NewPlace";
import PlaceDetail from "components/pages/DetailPlace";

const store = createStore();

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Container>
        <Route path="/">
          <NewPlace />
          <Map />
        </Route>
        <Route path="/admin" component={Side} />
        <Route path="/place/:place_id" component={PlaceDetail} />
      </Container>
    </Provider>
  );
};

export default App;

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  a {
    color: #868e96;
    text-decoration: none;
  }
  body {
    margin: 0;
    background: rgb(250,245,29);
    // background: linear-gradient(0deg, rgba(250,245,29,1) 0%, rgba(250,45,197,1) 50%, rgba(146,69,255,1) 100%);
  }
  .marker {
    width: 80px;
    height: 80px;
    overflow: hidden;
    background-size: cover;
    border-radius: 50%;
    border: 6px solid #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor:pointer;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    position: relative;
  }
`;
