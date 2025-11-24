import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import { bulbReducer } from "./bulbSlice";
import { displayReducer } from "./displayNetworkDataSlice";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = composeEnhancers(applyMiddleware(ReduxThunk));

const reducers = combineReducers({
  bulbReducer: bulbReducer,
  displayReducer: displayReducer,
});

export const store = createStore(reducers, middlewares);
