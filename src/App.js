import React from "react";
import { Provider } from "react-redux";
import createStore from "./store";

import MapContainer from "components/MapContainer";
import Layout from "components/Layout";
import Side from "components/Side";
import Trending from "components/Trending";

const store = createStore();

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Trending />
        <MapContainer />
        <Side />
      </Layout>
    </Provider>
  );
};

export default App;
