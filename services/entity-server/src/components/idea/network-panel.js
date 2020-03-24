import style from "./network-panel.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import neighbourhoodImg from "../../assets/img/neighbourhood.png";
import { getNameFromUri } from "../utils";
import sessionImg from "../../assets/img/session.png";
import React from "react";

const NetworkPanel = props => {
  const { inspiredBy, hasBrainstormingSession } = props.idea;
  return (
    <div className={style.networkPanelWrapper}>
      <NeighbourhoodPreview />
      <SessionViewPreview brainstormingSession={hasBrainstormingSession} />
      <InspiredBy inspiredBy={inspiredBy} />
    </div>
  );
};

const ConditionallyLinkedContent = props => {
  const {
    condition,
    content,
    classNameIfTrue,
    classNameIfFalse,
    linkPath
  } = props;
  if (condition) {
    return (
      <Link to={linkPath}>
        <div className={classNameIfTrue}>{content}</div>
      </Link>
    );
  } else {
    return <div className={classNameIfFalse}>{content}</div>;
  }
};

ConditionallyLinkedContent.propTypes = {
  condition: PropTypes.bool.isRequired,
  content: PropTypes.element.isRequired,
  classNameIfTrue: PropTypes.string,
  classNameIfFalse: PropTypes.string,
  linkPath: PropTypes.string.isRequired
};

const NeighbourhoodPreview = props => {
  const { neighbourhood } = props;
  const linkCondition = neighbourhood ? true : false;
  return (
    <div className={style.networkSectionWrapper}>
      <h3>Neighbourhood</h3>
      <ConditionallyLinkedContent
        condition={linkCondition}
        content={
          <div className={style.neighbourhoodPreview}>
            <img
              width={"100%"}
              alt={"neighbourhood-preview"}
              src={neighbourhoodImg}
            />
          </div>
        }
        linkPath={"/home"} //TODO: update when implementing this
        classNameIfFalse={style.notAvailable}
      />
    </div>
  );
};

const SessionViewPreview = props => {
  const { brainstormingSession } = props;
  const linkCondition = brainstormingSession ? true : false;
  const sessionPath = brainstormingSession
    ? "/entities/sessions/" + getNameFromUri(brainstormingSession)
    : "";

  return (
    <div className={style.networkSectionWrapper}>
      <h3>Session</h3>
      <ConditionallyLinkedContent
        condition={linkCondition}
        content={
          <div className={style.neighbourhoodPreview}>
            <img width={"100%"} alt={"session-preview"} src={sessionImg} />
          </div>
        }
        linkPath={sessionPath} //TODO: update when implementing this
        classNameIfFalse={style.notAvailable}
      />
    </div>
  );
};

const InspiredBy = props => {
  const { inspiredBy } = props;
  if (inspiredBy && inspiredBy.length > 0) {
    return (
      <div className={style.networkSectionWrapper}>
        <h3>Inspired By</h3>
        <div className={style.inspiredByPreview}>
          <Link to={"/entities/ideas/" + getNameFromUri(inspiredBy)}>
            <div className={style.inspirationItem}>
              <div className={style.basicDiamond} />
              <span className={style.inspirationText}>
                {getNameFromUri(inspiredBy)}
              </span>
            </div>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className={style.networkSectionWrapper + " " + style.notAvailable}>
        <h3>Inspired By</h3>
        <div className={style.inspiredByPreview}>NO INSPIRATIONS</div>
      </div>
    );
  }
};

NetworkPanel.propTypes = {
  idea: PropTypes.object.isRequired
};

export default NetworkPanel;
