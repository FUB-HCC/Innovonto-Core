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
        <Link to="/research">
          <Button
            minimal={true}
            active={location.pathname.includes("research")}
          >
            Research
          </Button>
        </Link>
        <Link to="/model">
          <Button minimal={true} active={location.pathname.includes("model")}>
            Model
          </Button>
        </Link>
        <Link to="/data">
          <Button minimal={true} active={location.pathname.includes("data")}>
            Data
          </Button>
        </Link>
        <Link to="/software">
          <Button
            minimal={true}
            active={location.pathname.includes("software")}
          >
            Software
          </Button>
        </Link>
        <NavbarDivider />
        <Link to="/about">
          <Button minimal={true} active={location.pathname.includes("about")}>
            About
          </Button>
        </Link>
        <Link to="/login">
          <Button minimal={true} active={location.pathname.includes("login")}>
            Login
          </Button>
        </Link>
      </NavbarGroup>
    </Navbar>
  );
};
