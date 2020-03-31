import React, { useEffect, useState } from "react";
import { Tab } from "@blueprintjs/core";
import { requestIdeaDetailData } from "../../../middleware/requests";
import { useParams } from "react-router-dom";
import { getNameFromUri } from "../../../components/utils";
import InfoPanel from "../../../components/idea/info-panel";
import NetworkPanel from "../../../components/idea/network-panel";
import TabbedDetailView from "../../../components/common/tabbed-detail-view";
import { CenteredLayout } from "../../../components/common/page-layouts";

export const IdeaView = () => {
  const [ideaData, setIdeaData] = useState(null);
  const [error, setError] = useState(null);
  const ideaUrl = "/entities/ideas/" + useParams().id;
  useEffect(() => requestIdeaDetailData(ideaUrl, setIdeaData, setError), [
    ideaUrl,
    setIdeaData
  ]);
  if (!ideaData || error) {
    return (
      <CenteredLayout
        isLoading={true}
        pageTitle={"Idea Details"}
        error={error}
      />
    );
  }
  const { title, content } = ideaData;
  return (
    <CenteredLayout pageTitle={"Idea Details"}>
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
    </CenteredLayout>
  );
};
