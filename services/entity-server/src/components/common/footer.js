import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Navbar,
  NavbarGroup,
  Alignment,
  NavbarDivider,
  Button
} from "@blueprintjs/core";

function Copyright() {
  return (
    <div>
      Copyright ©
      <a
        href="https://www.mi.fu-berlin.de/en/inf/groups/hcc/index.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        HCC FU Berlins
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </div>
  );
}

export const Footer = props => {
  const location = useLocation();
  const { height } = props;
  return (
    <Navbar style={{ height: height }}>
      <NavbarGroup align={Alignment.LEFT}>
        <div>Innovonto Core Entity Server</div>
        <NavbarDivider />
        <div>A project by the Human-Centered Computing Workgroup</div>
        <NavbarDivider />
        <Copyright />
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Button minimal={true} active={location.pathname.includes("about")}>
          <Link to="/about">About</Link>
        </Button>
        <Button minimal={true} active={location.pathname.includes("imprint")}>
          <Link to="/imprint">Imprint</Link>
        </Button>
        <Button
          minimal={true}
          active={location.pathname.includes("privacy-policy")}
        >
          <Link to="/privacy-policy"> Privacy Policy</Link>
        </Button>
      </NavbarGroup>
    </Navbar>
  );
};
