import React from "react";
import PageTitle from "../../components/common/page-title";
import style from "./model-view.module.css";

export const ModelView = () => {
  return (
    <div className={style.modelViewWrapper}>
      <PageTitle title={"Model"} />
      <iframe
        title={"iframe-model"}
        id={"iframe-model"}
        className={style.modelIFrame}
        src={"https://innovonto-core.imp.fu-berlin.de/innovonto/types/"}
      />
    </div>
  );
};
