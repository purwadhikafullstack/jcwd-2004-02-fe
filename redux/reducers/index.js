import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import loadingReducers from "./loadingReducers.jsx";
import userReducer from "./userReducers.jsx"; 
import cartReducer from "./cartReducer.js";

const reducers = combineReducers({
  user: userReducer,
  loading: loadingReducers, 
  cart: cartReducer
});

const middlewares = [thunk];

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);
