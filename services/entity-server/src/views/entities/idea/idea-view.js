import style from "./idea-view.module.css";
import PageTitle from "../../../components/common/page-title";
import React, { useEffect, useState } from "react";
import { Tab } from "@blueprintjs/core";
import { requestIdeaDetailData } from "../../../middleware/requests";
import { useParams } from "react-router-dom";
import { getNameFromUri } from "../../../components/utils";
import InfoPanel from "../../../components/idea/info-panel";
import NetworkPanel from "../../../components/idea/network-panel";
import TabbedDetailView from "../../../components/common/tabbed-detail-view";

export const IdeaView = () => {
  const [ideaData, setIdeaData] = useState(null);
  const ideaUrl = "/entities/ideas/" + useParams().id;
  useEffect(() => requestIdeaDetailData(ideaUrl, setIdeaData), [
    ideaUrl,
    setIdeaData
  ]);
  if (!ideaData) {
    return <div></div>; //TODO: unified loading screen
  }
  const { title, content } = ideaData;
  return (
    <div className={style.ideaViewWrapper}>
      <PageTitle title={"Idea Details"} />
      <TabbedDetailView
        title={title}
        content={<p>{content}</p>}
        subtitle={"ID: " + getNameFromUri(ideaData.id).toUpperCase()}
        tabs={[
          <Tab
            id={"info"}
            title={"Info"}
            key={"info"}
            panel={<InfoPanel idea={ideaData} />}
          />,
          <Tab
            id={"network"}
            title={"Network"}
            key={"network"}
            panel={<NetworkPanel idea={ideaData} />}
          />,
          <Tab
            disabled
            id={"social"}
            title={"Social"}
            panel={<div />}
            key={"social"}
          />,
          <Tab
            disabled
            id={"history"}
            title={"History"}
            panel={<div />}
            key={"history"}
          />
        ]}
      />
    </div>
  );
};
