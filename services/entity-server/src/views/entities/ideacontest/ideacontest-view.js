import React, { useEffect, useState } from "react";
import { requestIdeaContestDetailData } from "../../../middleware/requests";
import {
  EmptyList,
  getNameFromUri,
  urlToEntity
} from "../../../components/utils";
import { CenteredLayout } from "../../../components/common/page-layouts";
import TabbedDetailView from "../../../components/common/tabbed-detail-view";
import { Button, Intent, Tab } from "@blueprintjs/core";
import style from "./ideacontest-view.module.css";
import { CreatedAt } from "../../../components/idea/info-panel";
import { Link } from "react-router-dom";

export const IdeaContestView = () => {
  const [ideaContestData, setIdeaContestData] = useState(null);
  const [error, setError] = useState(null);
  const entityUrl = urlToEntity(window.location.href);
  useEffect(
    () => requestIdeaContestDetailData(entityUrl, setIdeaContestData, setError),
    [entityUrl, setIdeaContestData]
  );
  if (!ideaContestData || error) {
    return (
      <CenteredLayout
        isLoading={true}
        pageTitle={"Idea Contest Details"}
        error={error}
      />
    );
  }
  const {
    id,
    hasResearchDescription,
    startDate,
    endDate,
    title,
    description
  } = ideaContestData;
  return (
    <CenteredLayout pageTitle={"Idea Contest Details"}>
      <TabbedDetailView
        title={title ? title : id}
        content={<div>{description}</div>}
        tabs={[
          <Tab
            id={"info"}
            title={"Info"}
            key={"info"}
            panel={
              <ContestInfo started={startDate} finished={endDate} id={id} />
            }
          />,
          <Tab
            id={"details"}
            title={"Details"}
            key={"details"}
            panel={<ResearchDescriptionList list={hasResearchDescription} />}
          />
        ]}
      />
    </CenteredLayout>
  );
};

const ContestInfo = props => {
  const { started, finished, id } = props;
  if (!started && !finished) {
    return <EmptyList />;
  }
  return (
    <div className={style.contestInfo}>
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
      <br />
      <Link to={"/idea-map/" + getNameFromUri(id)}>
        <Button
          icon={"layout-group-by"}
          minimal={true}
          intent={Intent.SUCCESS}
          text={"Idea Map"}
          active={true}
        />
      </Link>
    </div>
  );
};

const ResearchDescriptionList = props => {
  const { list } = props;
  if (!list || list.length < 1) return <EmptyList />;
  return (
    <div className={style.contestInfo}>
      {list.map(description => (
        <ResearchDescription
          key={description.id}
          id={
            description.title
              ? description.title
              : getNameFromUri(description.id)
          }
          content={description.description}
        />
      ))}
    </div>
  );
};

const ResearchDescription = props => {
  const { id, content } = props;
  return (
    <div>
      <h3>{id}</h3>
      <p>{content}</p>
    </div>
  );
};
