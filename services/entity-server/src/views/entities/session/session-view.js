import React from "react";
import style from "./session-view.module.css";
import SessionGraph from "../../../components/session-graph/session-graph";
import { useWindowSize } from "../../../components/utils";

const sessionHeight = height => 0.8 * height;
const sessionWidth = width => 0.6 * width;

const SessionView = () => {
  const [windowWidth, windowHeight] = useWindowSize();
  const sessionGraphProps = {
    width: sessionWidth(windowWidth),
    height: sessionHeight(windowHeight)
  };

  return (
    <div className={style.sessionPageWrapper}>
      <SessionGraph {...sessionGraphProps} />
    </div>
  );
};

export default SessionView;
