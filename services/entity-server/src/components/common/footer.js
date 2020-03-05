import React from "react";
import {Link, useLocation} from "react-router-dom";
import {Navbar, NavbarGroup, Alignment, NavbarDivider, Button, NavbarHeading} from "@blueprintjs/core";

function Copyright() {
  return (
    <NavbarHeading>
      {"Copyright © "}
      <a
        href="https://www.mi.fu-berlin.de/en/inf/groups/hcc/index.html"
        target="_blank"
      >
        HCC FU Berlin
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </NavbarHeading>
  );
}

export const Footer = function() {
  const location = useLocation();
  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>Innovonto Core Entity Server</NavbarHeading>
      </NavbarGroup>
      <NavbarDivider/>
      <NavbarGroup align={Alignment.CENTER}>
        <Copyright />
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Button minimal={true} active={location.pathname.includes('imprint')}>
          <Link to="/imprint">Imprint</Link>
        </Button>
        <Button minimal={true} active={location.pathname.includes('privacy-policy')}>
          <Link to="/privacy-policy"> Privacy Policy</Link>
        </Button>
      </NavbarGroup>
    </Navbar>
  );
};
