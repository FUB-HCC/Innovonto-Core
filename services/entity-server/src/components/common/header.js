import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Alignment,
  Button,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Popover,
  Menu,
  MenuDivider
} from "@blueprintjs/core";
import { useWindowSize } from "../utils";
import style from "./header.module.css";

const logo = require("../../assets/img/logo-placeholder.png");

export const Header = props => {
  const location = useLocation();
  const [windowWidth] = useWindowSize();
  const isOnMobile = windowWidth <= 425;
  const ResearchLink = (
    <Link to="/research/-">
      <Button minimal={true} active={location.pathname.includes("research")}>
        Research
      </Button>
    </Link>
  );

  const ModelLink = (
    <Link to="/model">
      <Button minimal={true} active={location.pathname.includes("model")}>
        Model
      </Button>
    </Link>
  );

  const DataLink = (
    <Link to="/data">
      <Button minimal={true} active={location.pathname.includes("data")}>
        Data
      </Button>
    </Link>
  );

  const SoftwareLink = (
    <Link to="/software">
      <Button minimal={true} active={location.pathname.includes("software")}>
        Software
      </Button>
    </Link>
  );

  const AboutLink = (
    <Link to="/about/-">
      <Button minimal={true} active={location.pathname.includes("about")}>
        About
      </Button>
    </Link>
  );

  const SearchLink = (
    <Link to="/search">
      <Button minimal={true} active={location.pathname.includes("search")}>
        Search
      </Button>
    </Link>
  );

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
      {!isOnMobile && (
        <NavbarGroup align={Alignment.RIGHT}>
          {ResearchLink}
          {ModelLink}
          {DataLink}
          {SoftwareLink}
          <NavbarDivider />
          {AboutLink}
          {SearchLink}
        </NavbarGroup>
      )}
      {isOnMobile && (
        <NavbarGroup align={Alignment.RIGHT}>
          <Popover
            target={<Button icon={"menu"} />}
            minimal={true}
            content={
              <Menu>
                <Link to={"/research/-"}>
                  <li className={"bp3-menu-item"}>{"Research"}</li>
                </Link>
                <Link to={"/model"}>
                  <li className={"bp3-menu-item"}>{"Model"}</li>
                </Link>
                <li className={"bp3-menu-item " + style.disabledMenuItem}>
                  {"Data  -  Desktop Only"}
                </li>
                <Link to={"/software"}>
                  <li className={"bp3-menu-item"}>{"Software"}</li>
                </Link>
                <MenuDivider />
                <Link to={"/about/-"}>
                  <li className={"bp3-menu-item"}>{"About"}</li>
                </Link>
                <li className={"bp3-menu-item " + style.disabledMenuItem}>
                  {"Search  -  Desktop Only"}
                </li>
              </Menu>
            }
          />
        </NavbarGroup>
      )}
    </Navbar>
  );
};
