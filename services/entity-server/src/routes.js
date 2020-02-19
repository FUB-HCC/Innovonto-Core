import React from 'react'
import {connect} from 'react-redux'
import {HomeView} from "./views/home";
import {IdeaMapView} from "./views/ideaMapView";
import {Route, Switch, withRouter} from 'react-router-dom'
import {Header} from "./components/common/header";

/* TODO
    valid contests:
    AC1:    http%3A%2F%2Fpurl.org%2Finnovonto%2FideaContests%2FTCO
    AC2:    http%3A%2F%2Fpurl.org%2Finnovonto%2FideaContests%2Fbionic-radar
 */
const Routes = () => {
    return (
        <React.Fragment>
            <Header />
            <div className="site-content">
                <Switch>
                    <Route path="/ideamaps/:contest" component={IdeaMapView} />
                    <Route path="/" component={HomeView}/>
                </Switch>
            </div>
            {/*<Footer />*/}
        </React.Fragment>
    );
};

function mapStateToProps(state) {
    return {}
}

export default withRouter(connect(mapStateToProps)(Routes))