import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SessionView from "./views/session/session-view";
import SearchView from "./views/search/search-view";

const Root = props => (
  <Provider store={props.store}>
    <Router>
      <Route path="/session" component={SessionView} />
      <Route exact path="/" component={SearchView} />
    </Router>
  </Provider>
);

export default Root;
//TODO: reverse Routing
