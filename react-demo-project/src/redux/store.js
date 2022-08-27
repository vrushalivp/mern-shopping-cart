import { createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";

import rootReducers from "./reducer";

const initalState = {};
const middleware = [thunk];
const store = createStore(
    rootReducers,
    initalState,
    compose(applyMiddleware(...middleware))
    );

export default store;