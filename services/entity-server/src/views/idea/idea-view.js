import style from "./idea-view.module.css";
import PageTitle from "../../components/common/page-title";
import React, { useEffect, useState } from "react";
import { Button, Tab, Tabs, Intent } from "@blueprintjs/core";
import { requestIdeaDetailData } from "../../middleware/requests";
import { useParams } from "react-router-dom";
import { getNameFromUri } from "../../components/utils";
import { useHistory } from "react-router-dom";
import InfoPanel from "../../components/idea/info-panel";
import NetworkPanel from "../../components/idea/network-panel";

export const IdeaView = () => {
  const [ideaData, setIdeaData] = useState(null);
  const ideaUrl = "/entities/ideas/" + useParams().id;
  useEffect(() => requestIdeaDetailData(ideaUrl, setIdeaData), [
    ideaUrl,
    setIdeaData
  ]);
  const history = useHistory();
  if (!ideaData) {
    return <div></div>; //TODO: unified loading screen
  }
  const { title, content } = ideaData;
  return (
    <div className={style.ideaViewWrapper}>
      <PageTitle title={"Idea Details"} />
      <div className={style.ideaViewContent}>
        <div className={style.largeTitle}>
          <Button
            className={style.backButton}
            minimal={true}
            icon={"chevron-left"}
            intent={Intent.SUCCESS}
            active={true}
            onClick={() => history.goBack()}
          >
            Back to Idea Map
          </Button>{" "}
          <br />
          {title ? title : "no title"}{" "}
          <span className={style.idSpan}>
            {getNameFromUri(ideaData.id).toUpperCase()}
          </span>
        </div>
        <div className={style.ideaDescription}>
          <p>{content}</p>
        </div>
        <Tabs id={"ideaDetailsTabs"} defaultSelectedTabId={"info"}>
          <Tab
            id={"info"}
            title={"Info"}
            panel={<InfoPanel idea={ideaData} />}
          />
          <Tab
            id={"network"}
            title={"Network"}
            panel={<NetworkPanel idea={ideaData} />}
          />
          <Tab disabled id={"social"} title={"Social"} panel={<div />} />
          <Tab disabled id={"history"} title={"History"} panel={<div />} />
        </Tabs>
      </div>
    </div>
  );
};
