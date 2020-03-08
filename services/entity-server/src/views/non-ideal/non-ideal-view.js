import React from "react";
import PropTypes from "prop-types";
import style from "./non-ideal-view.module.css";
import { NonIdealState, Icon, Intent, Button } from "@blueprintjs/core";
import { Link } from "react-router-dom";

export const NonIdealViewIntent = {
  NOT_FOUND: "NOT_FOUND",
  ERROR: "ERROR"
};

export const NonIdealView = props => {
  let title, icon, action, description;
  switch (props.intent) {
    case NonIdealViewIntent.ERROR:
      if (props.errorData) {
        console.log("ERROR", props.errorData.error, props.errorData.info);
        description = (
          <span>
            Error: {" " + props.errorData.error} <br /> {props.errorData.info}
          </span>
        );
      } else {
        description = (
          <span>
            Unknown error! <br />
            There should be error data here - please contact the administrator!
          </span>
        );
      }
      title = "An error occured!";
      icon = <Icon icon={"error"} iconSize={50} intent={Intent.DANGER} />;
      action = (
        <Link to="/">
          <Button intent={Intent.DANGER}>Return to Home Page</Button>
        </Link>
      );
      break;
    case NonIdealViewIntent.NOT_FOUND:
      title = "Page not found";
      icon = <Icon icon={"search"} iconSize={50} intent={Intent.WARNING} />;
      action = (
        <Link to="/">
          <Button intent={Intent.WARNING}>Return to Home Page</Button>
        </Link>
      );
      description =
        "The page " + window.location.pathname + " does not exist (yet).";
      break;
    default:
      break;
  }
  return (
    <>
      <div className={style.nonIdealViewWrapper}>
        <NonIdealState
          icon={icon}
          action={action}
          title={title}
          description={description}
        />
      </div>
      <div className={style.nonIdealViewSpacing}></div>
    </>
  );
};

NonIdealView.propTypes = {
  intent: PropTypes.string.isRequired,
  errorData: PropTypes.object
};

export default NonIdealView;
