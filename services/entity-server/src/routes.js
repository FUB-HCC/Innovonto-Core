import React from 'react'
import {connect} from 'react-redux'
import {HomeView} from "./views/home";
import {Route, Switch, withRouter} from 'react-router-dom'
import {Header} from "./components/common/header";

const Routes = () => {
    return (
        <React.Fragment>
            <Header />
            <div className="site-content">
                <Switch>
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