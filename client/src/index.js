import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import rootReducers from "./component/chat/store/reducer/index";
import { createStore } from "redux";
import "./mateng.css";

const store = createStore(rootReducers);
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
