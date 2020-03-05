import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Alignment,
  Button,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading
} from "@blueprintjs/core";

const logo = require("../../assets/img/logo-placeholder.png");

export const Header = props => {
  const location = useLocation();
  const { height } = props;
  return (
    <Navbar style={{ height: height }}>
      <NavbarGroup>
        <NavbarHeading>
          <div>
            <Link to="/">
              <img src={logo} alt="Logo" height="55" />
            </Link>
          </div>
        </NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Button minimal={true} active={location.pathname.includes("research")}>
          <Link to="/research">Research</Link>
        </Button>
        <Button minimal={true} active={location.pathname.includes("model")}>
          <Link to="/model">Model</Link>
        </Button>
        <Button minimal={true} active={location.pathname.includes("data")}>
          <Link to="/data">Data</Link>
        </Button>
        <Button minimal={true} active={location.pathname.includes("software")}>
          <Link to="/software">Software</Link>
        </Button>
        <NavbarDivider />
        <Button minimal={true} active={location.pathname.includes("about")}>
          <Link to="/about">About</Link>
        </Button>
        <Button minimal={true} active={location.pathname.includes("login")}>
          <Link to="/login">Login</Link>
        </Button>
      </NavbarGroup>
    </Navbar>
  );
};
