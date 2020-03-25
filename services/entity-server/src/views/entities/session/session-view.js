import React, { useEffect, useState } from "react";
import style from "./session-view.module.css";
import SessionGraph from "../../../components/session-graph/session-graph";
import {
  AltTextComponent,
  getNameFromUri, urlToEntity,
  useWindowSize
} from "../../../components/utils";
import { requestSessionData } from "../../../middleware/requests";
import Sidebar from "../../../components/common/sidebar";
import { headerHeight, footerHeight } from "../../../root";
import {
  CreatedAt,
  CreatedBy,
  CreatedFor,
  SubmissionMethod
} from "../../../components/idea/info-panel";
import { Button, ButtonGroup, Intent } from "@blueprintjs/core";

const sideBarWidth = 330;
const sideBarHeight = height => height - headerHeight - footerHeight;
const sessionHeight = height => height - headerHeight - footerHeight;
const sessionWidth = width => width - sideBarWidth;

const SessionRadio = {
  TIMELINE: "TIMELINE",
  TREE: "TREE"
};

const SessionView = () => {
  const [windowWidth, windowHeight] = useWindowSize();
  const [sessionData, setSessionData] = useState(null);
  const [selectedViz, setSelectedViz] = useState(SessionRadio.TIMELINE);
  const entityId = urlToEntity(window.location.href);
  useEffect(() => requestSessionData(entityId, setSessionData), [entityId]);
  if (!sessionData) {
    return (
      <AltTextComponent
        name={"Solution Map"}
        width={windowWidth}
        height={windowHeight}
      />
    );
  }
  //TODO: built unified loading behaviour

  return (
    <div className={style.sessionPageWrapper}>
      <Sidebar
        width={sideBarWidth}
        height={sideBarHeight(windowHeight)}
        title={"Session View"}
        subtitle={"ID: " + getNameFromUri(sessionData.id).toUpperCase()}
        sideBarModules={[
          <>
            <SessionDetails
              started={sessionData.started}
              finished={sessionData.finished}
              creator={sessionData.creator}
              ideaContest={sessionData.hasIdeaContest}
              submissionMethod={sessionData.hasSubmissionMethod}
            />
            <SelectedVizRadio
              selectedViz={selectedViz}
              setSelectedViz={setSelectedViz}
            />
          </>
        ]}
      />
      {selectedViz === SessionRadio.TIMELINE && (
        <SessionGraph
          width={sessionWidth(windowWidth)}
          height={sessionHeight(windowHeight)}
          eventList={sessionData.hasTrackingEvent}
        />
      )}
      {selectedViz === SessionRadio.TREE && <SessionTree />}
    </div>
  );
};

const SelectedVizRadio = props => {
  const { selectedViz, setSelectedViz } = props;
  return (
    <div className={style.sessionDetails}>
      <ButtonGroup fill={true}>
        <Button
          className={style.radioButton}
          intent={Intent.SUCCESS}
          active={selectedViz === SessionRadio.TIMELINE}
          minimal={true}
          onClick={() => setSelectedViz(SessionRadio.TIMELINE)}
          icon={"layout-linear"}
        >
          TIMELINE
        </Button>
        <Button
          className={style.radioButton}
          intent={Intent.SUCCESS}
          active={selectedViz === SessionRadio.TREE}
          minimal={true}
          disabled={true}
          onClick={() => setSelectedViz(SessionRadio.TREE)}
          icon={"diagram-tree"}
        >
          TREE
        </Button>
      </ButtonGroup>
    </div>
  );
};

const SessionDetails = props => {
  const { started, finished, ideaContest, submissionMethod, creator } = props;
  return (
    <div className={style.sessionDetails}>
      {creator && <CreatedBy user={creator} />}
      {ideaContest && <CreatedFor project={ideaContest} />}

      {started && (
        <>
          <h3>Started:</h3> <CreatedAt date={started} />
        </>
      )}
      {finished && (
        <>
          <h3>Ended:</h3> <CreatedAt date={finished} />
        </>
      )}
      {submissionMethod && (
        <SubmissionMethod submissionMethod={submissionMethod} />
      )}
    </div>
  );
};

const SessionTree = props => <div>THIS IS A PLACEHOLDER</div>;

export default SessionView;
