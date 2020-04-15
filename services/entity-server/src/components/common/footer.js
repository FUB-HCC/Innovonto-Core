import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Navbar,
  NavbarGroup,
  Alignment,
  NavbarDivider,
  Button,
  Popover,
  Menu
} from "@blueprintjs/core";
import { useWindowSize } from "../utils";

function Copyright() {
  return (
    <div>
      Copyright ©
      <a
        href="https://www.mi.fu-berlin.de/en/inf/groups/hcc/index.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        HCC FU Berlin
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </div>
  );
}

export const Footer = props => {
  const [windowWidth] = useWindowSize();
  const isOnMobile = windowWidth <= 425;
  const location = useLocation();
  const { height } = props;
  return (
    <Navbar style={{ height: height }}>
      <NavbarGroup align={Alignment.LEFT}>
        <div>Innovonto Core Entity Server</div>
        {!isOnMobile && (
          <>
            <NavbarDivider />
            <div>A project by the Human-Centered Computing Workgroup</div>
          </>
        )}
        <NavbarDivider />
        <Copyright />
        {isOnMobile && (
          <Popover
            target={<Button icon={"menu"} text={"About"} />}
            minimal={true}
            content={
              <Menu>
                <Link to={"/about/-"}>
                  <li className={"bp3-menu-item"}>{"About"}</li>
                </Link>
                <Link to={"/about/imprint"}>
                  <li className={"bp3-menu-item"}>{"Imprint"}</li>
                </Link>
                <Link to={"/about/privacy-policy"}>
                  <li className={"bp3-menu-item"}>{"Privacy Policy"}</li>
                </Link>
              </Menu>
            }
          />
        )}
      </NavbarGroup>
      {!isOnMobile && (
        <NavbarGroup align={Alignment.RIGHT}>
          <Link to="/about/-">
            <Button minimal={true} active={location.pathname.includes("about")}>
              About
            </Button>
          </Link>
          <Link to="/about/imprint">
            <Button
              minimal={true}
              active={location.pathname.includes("imprint")}
            >
              Imprint
            </Button>
          </Link>
          <Link to="/about/privacy-policy">
            <Button
              minimal={true}
              active={location.pathname.includes("privacy-policy")}
            >
              Privacy Policy
            </Button>
          </Link>
        </NavbarGroup>
      )}
    </Navbar>
  );
};
