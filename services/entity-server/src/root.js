import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import ErrorBoundary from "./components/common/error-boundary";
import SessionView from "./views/session/session-view";
import SearchView from "./views/search/search-view";
import { Header } from "./components/common/header";
import { Footer } from "./components/common/footer";
import { HomeView } from "./views/home/home-view";
import { DataView } from "./views/data/data-view";
import {
  NonIdealView,
  NonIdealViewIntent
} from "./views/non-ideal/non-ideal-view";
import { SoftwareView } from "./views/software-view/software-view";
import { ResearchView } from "./views/research/research-view";
import { AboutView } from "./views/about/about-view";

export const footerHeight = 50;
export const headerHeight = 50;

const Root = () => (
  <Router>
    <Header height={headerHeight} />
    <ErrorBoundary
      onError={(error, info) => (
        <Redirect
          to={{
            pathname: "/error",
            state: {
              error: error,
              info: info
            }
          }}
        />
      )}
    >
      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route path="/research/:paragraph" component={ResearchView} />
        <Route path="/software" component={SoftwareView} />
        <Route path="/about/:paragraph" component={AboutView} />
        <Route path="/data" component={DataView} />
        <Route path="/search" component={SearchView} />
        <Route path="/session" component={SessionView} />
        <Route
          path={"/error"}
          render={props => (
            <NonIdealView
              intent={NonIdealViewIntent.ERROR}
              errorData={props.location.state}
            />
          )}
        />
        <Route
          render={() => <NonIdealView intent={NonIdealViewIntent.NOT_FOUND} />}
        />
      </Switch>
    </ErrorBoundary>
    <Footer height={footerHeight} />
  </Router>
);

export default Root;
