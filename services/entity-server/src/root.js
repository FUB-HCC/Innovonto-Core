import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SessionView from "./views/session/session-view";
import SearchView from "./views/search/search-view";
import { Header } from "./components/common/header";
import { Footer } from "./components/common/footer";
import { HomeView } from "./views/home/home-view";

export const footerHeight = 50;
export const headerHeight = 50;

const Root = props => (
  <Provider store={props.store}>
    <Router>
      <Header height={headerHeight} />
      <Route path="/session" component={SessionView} />
      <Route exact path="/" component={HomeView} />
      <Footer height={footerHeight} />
    </Router>
  </Provider>
);

export default Root;
