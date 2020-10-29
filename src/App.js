import React from "react";
import { Provider } from "react-redux";
import createStore from "./store";

import Auth from "../src/feature/User/";

const store = createStore();

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Auth />
      </div>
    </Provider>
  );
};

export default App;
