import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Navbar, Alignment, Button, NavbarDivider, NavbarGroup, NavbarHeading } from "@blueprintjs/core";

const logo = require("../../assets/img/logo-placeholder.png");

export const Header = () => {
  const location = useLocation();
  return (
    <Navbar>
      <NavbarGroup>
        <NavbarHeading>
          <div>
            <Link className="navbar-item" to="/">
              <img src={logo} alt="Logo" height="55" />
            </Link>
            <label
              role="button"
              aria-label="menu"
              aria-expanded="false"
              htmlFor="nav-toggle-state"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </label>
          </div>
        </NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Button minimal={true} active={location.pathname.includes('research')}>
          <Link to="/research">
            Research
          </Link>
        </Button>
        <Button minimal={true} active={location.pathname.includes('model')}>
          <Link to="/model" className="navbar-item">
            Model
          </Link>
        </Button>
        <Button minimal={true} active={location.pathname.includes('data')}>
          <Link to="/data" className="navbar-item">
            Data
          </Link>
        </Button>
        <Button minimal={true} active={location.pathname.includes('software')}>
          <Link to="/software" className="navbar-item">
            Software
          </Link>
        </Button>
        <NavbarDivider/>
        <Button minimal={true} active={location.pathname.includes('about')}>
          <Link to="/about" className="navbar-item">
            About
          </Link>
        </Button>
        <Button minimal={true} active={location.pathname.includes('login')}>
          <Link to="/login" className="navbar-item">
            Login
          </Link>
        </Button>
      </NavbarGroup>
    </Navbar>
  )
}

