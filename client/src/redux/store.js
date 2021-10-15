import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(
  combineReducers({
    user: userReducer,
  }),
  composedEnhancer
);

export default store;
