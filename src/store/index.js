import { createStore, compose, applyMiddleware } from "redux";
import initial from "../initial.json";
import sagas from "../sagas";
import createSagaMiddleware from "redux-saga";

const reducer = function (state = initial, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { user: action.payload };
    case "LOADING":
      return { loading: action.payload };
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  initial,
  compose(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(sagas);
export default store;
