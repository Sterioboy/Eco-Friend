import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { auth } from "./user/reducers";
import { entry } from "./entry/reducers";
import { map } from "./map/reducers";

const reducers = combineReducers({
  auth,
  entry,
  map,
});

const composeEnhancer =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(thunk)
    : composeWithDevTools(applyMiddleware(thunk));

export const store = createStore(reducers, composeEnhancer);
