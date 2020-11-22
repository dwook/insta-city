import React from "react";
import { Provider } from "react-redux";
import createStore from "./store";
import { Route } from "react-router-dom";

import MapContainer from "components/MapContainer";
import Layout from "components/Layout";
import Side from "components/Side";
import Trending from "components/Trending";
import PlaceDetail from "components/PlaceDetail";

const store = createStore();

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Route path="/">
          <Trending />
          <MapContainer />
        </Route>
        <Route path="/admin" component={Side} />
        <Route path="/place/:place_id" component={PlaceDetail} />
      </Layout>
    </Provider>
  );
};

export default App;
