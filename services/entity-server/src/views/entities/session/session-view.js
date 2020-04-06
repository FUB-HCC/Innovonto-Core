import React, { useEffect, useState } from "react";
import style from "./session-view.module.css";
import SessionGraph from "../../../components/session-graph/session-graph";
import {
  getNameFromUri,
  urlToEntity,
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
import { FullScreenSideBarLayout } from "../../../components/common/page-layouts";
import SessionTree from "../../../components/session-tree/session-tree";

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
  const [error, setError] = useState(null);
  const [selectedViz, setSelectedViz] = useState(SessionRadio.TIMELINE);
  const entityId = urlToEntity(window.location.href);
  useEffect(() => requestSessionData(entityId, setSessionData, setError), [
    entityId
  ]);
  if (!sessionData || error) {
    return (
      <FullScreenSideBarLayout
        sideBarWidth={sideBarWidth}
        pageTitle={"Session View"}
        isLoading={true}
        error={error}
        key={"session-non-ideal"}
      />
    );
  }
  return (
    <FullScreenSideBarLayout
      sideBarWidth={sideBarWidth}
      pageTitle={"Session View"}
      key={"session"}
    >
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
      {selectedViz === SessionRadio.TREE && (
        <SessionTree
          width={sessionWidth(windowWidth)}
          height={sessionHeight(windowHeight)}
          tree={sessionData.treeData}
        />
      )}
    </FullScreenSideBarLayout>
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

export default SessionView;
