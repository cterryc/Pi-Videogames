import { applyMiddleware, compose, createStore } from "redux"
import gamesReducer from "./reducer/gamesReducer.js";
import thunk from "redux-thunk";

const componseEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(gamesReducer, componseEnhancers(applyMiddleware(thunk)))

export default store;