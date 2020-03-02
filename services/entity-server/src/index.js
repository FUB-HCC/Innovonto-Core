import React from "react";
import { render } from "react-dom";
import { applyMiddleware, createStore } from "redux";
import reducers from "./store/reducers";
import { logger, thunk } from "./store/middleware";

import "./index.css";
import Root from "./root";

const store = createStore(reducers, {}, applyMiddleware(logger, thunk));

render(<Root store={store} />, document.getElementById("root"));
