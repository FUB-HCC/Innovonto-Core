import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSessionData } from "../../store/actions";

import style from "./session-view.module.css";
import SessionGraph from "../../components/session-graph/session-graph";
import { useWindowSize } from "../../components/utils";

const sessionHeight = height => 0.8 * height;
const sessionWidth = width => 0.6 * width;

const SessionView = props => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchSessionData()), [dispatch]);
  const eventsList = useSelector(store => store.data.sEvents);
  const [windowWidth, windowHeight] = useWindowSize();
  const sessionGraphProps = {
    width: sessionWidth(windowWidth),
    height: sessionHeight(windowHeight),
    eventList: eventsList
  };

  return (
    <div className={style.sessionPageWrapper}>
      <SessionGraph {...sessionGraphProps} />
    </div>
  );
};

export default SessionView;
