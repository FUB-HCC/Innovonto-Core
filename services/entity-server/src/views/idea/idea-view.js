import style from "./idea-view.module.css";
import PageTitle from "../../components/common/page-title";
import React from "react";
import { Tab, Tabs } from "@blueprintjs/core";

export const IdeaView = () => {
  return (
    <div className={style.ideaViewWrapper}>
      <PageTitle title={"Idea Details"} />
      <div className={style.ideaViewContent}>
        <div className={style.largeTitle}>IDEA TITLE</div>
        <div className={style.ideaDescription}>
          <p>
            In order to understand and augment ideation, our first step is to
            model the entity under investigation: Ideas. In their excellent
            paper "Designing Idea Management Tools: Three Challenges", Inie et
            al. describe that this approach falls short because ideas have to be
            considered in context. This led us to our current model, consisting
            of two topics: The idea itself, as a multi-facetted, interconnected
            entity, and the idea lifecycle, that captures the dynamic nature of
            ideas and their embedding in an ideation process. The current state
            of our model can be viewed on the <a href={"/model"}>model page</a>.
          </p>
        </div>
        <Tabs id={"ideaDetailsTabs"}>
          <Tab id={"info"} title={"Info"} panel={<InfoPanel />} />
          <Tab id={"network"} title={"Network"} panel={<NetworkPanel />} />
          <Tab disabled id={"social"} title={"Social"} panel={<div />} />
          <Tab disabled id={"history"} title={"History"} panel={<div />} />
        </Tabs>
      </div>
    </div>
  );
};

const NetworkPanel = props => {
  return <div>INFO</div>;
};

const InfoPanel = props => {
  return <div>INFO</div>;
};
