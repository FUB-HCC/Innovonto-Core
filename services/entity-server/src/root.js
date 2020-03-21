import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import ErrorBoundary from "./components/common/error-boundary";
import SessionView from "./views/entities/session/session-view";
import SearchView from "./views/search/search-view";
import { Header } from "./components/common/header";
import { Footer } from "./components/common/footer";
import { HomeView } from "./views/home/home-view";
import { DataView } from "./views/data/data-view";
import { ModelView } from "./views/model/model-view";
import {
  NonIdealView,
  NonIdealViewIntent
} from "./views/non-ideal/non-ideal-view";
import { SoftwareView } from "./views/software-view/software-view";
import { ResearchView } from "./views/research/research-view";
import { AboutView } from "./views/about/about-view";
import { SolutionView } from "./views/solution/solution-view";
import { EntityFallbackView } from "./views/entities/fallback/entity-fallback-view";
import { IdeaView } from "./views/idea/idea-view";

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
        {/*Documentation Routes */}
        <Route exact path="/" component={HomeView} />
        <Route path="/research/:paragraph" component={ResearchView} />
        <Route path="/model" component={ModelView} />
        <Route path="/data" component={DataView} />
        <Route path="/software" component={SoftwareView} />
        <Route path="/about/:paragraph" component={AboutView} />
        {/*Data Routes */}
        {/* TODO whats the correct format for idea maps? */}
        <Route path="/solution/:id" component={SolutionView} />
        <Route path="/search" component={SearchView} />
        <Route path="/entities/ideas/:id" component={IdeaView} />,
        <Route path="/entities/users/:id" component={EntityFallbackView} />
        <Route path="/entities/sessions/:id" component={SessionView} />
        <Route
          path="/entities/ideaContests/:id"
          component={EntityFallbackView}
        />
        <Route path="/entities/challenges/:id" component={EntityFallbackView} />
        <Route path="/entities/:id" component={EntityFallbackView} />
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
