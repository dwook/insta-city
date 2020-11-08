import React from "react";
import { Provider } from "react-redux";
import createStore from "./store";

import Auth from "../src/feature/User/";
import CreatePlacePage from "./feature/Place";

const store = createStore();

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Auth />
        <CreatePlacePage/>
      </div>
    </Provider>
  );
};

export default App;
