import * as React from "react";
import * as Router from "react-router-dom";

const logo = require("../../assets/img/logo-placeholder.png");

export const Header = function () {
    return (
        <nav
            className="navbar has-shadow"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-brand">
                <Router.Link className="navbar-item" to="/">
                    <img src={logo} alt="Logo" height="60"/>
                </Router.Link>

                <label
                    role="button"
                    className="navbar-burger burger"
                    aria-label="menu"
                    aria-expanded="false"
                    htmlFor="nav-toggle-state"
                >
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                </label>
            </div>
            <input type="checkbox" id="nav-toggle-state"/>

            <div className="navbar-menu">
                <div className="navbar-start">
                    <Router.NavLink
                        to="/model"
                        className="navbar-item"
                        activeClassName="selected"
                    >
                        Model
                    </Router.NavLink>

                    <Router.NavLink to="/projects" className="navbar-item">
                        Data
                    </Router.NavLink>

                    <Router.NavLink to="/entities" className="navbar-item">
                        Search
                    </Router.NavLink>

                    <a
                        className="navbar-item"
                        href={process.env.REACT_APP_FUSEKI_BASE + "/index.html"}
                    >
                        Management
                    </a>
                </div>
            </div>
        </nav>
    );
};
