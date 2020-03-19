import style from "./idea-view.module.css";
import PageTitle from "../../components/common/page-title";
import React from "react";

export const IdeaView = () => {
  return (
    <div className={style.ideaViewWrapper}>
      <PageTitle title={"Idea Details"} />
      <div className={style.ideaViewContent}></div>
    </div>
  );
};
