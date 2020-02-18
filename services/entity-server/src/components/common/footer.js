import * as React from "react";
import * as Router from "react-router-dom";

function Copyright() {
    return (
        <p>
            {'Copyright © '}
            <a href="https://www.mi.fu-berlin.de/en/inf/groups/hcc/index.html" target="_blank">
                HCC FU Berlin
            </a>{' '}
            {new Date().getFullYear()}
            {'.'}
        </p>
    );
}

export const Footer = function () {
    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p>Innovonto Core Entity Server</p>
                <Copyright/>
                <p>
                    <Router.NavLink to="/imprint">
                        Imprint
                    </Router.NavLink>
                </p>
                <p>
                    <Router.NavLink to="/privacy-policy">
                        Privacy Policy
                    </Router.NavLink>
                </p>
            </div>
        </footer>
    )
};