import React from "react";
import PageTitle from "../../components/common/page-title";
import style from "./model-view.module.css";
import { useWindowSize } from "../../components/utils";
import { footerHeight, headerHeight } from "../../root";

export const ModelView = () => {
  const [, windowHeight] = useWindowSize();
  const modelViewContentHeight = windowHeight - headerHeight * 2 - footerHeight;
  return (
    <div className={style.modelViewWrapper}>
      <PageTitle title={"Model"} />
      <iframe
        title={"iframe-model"}
        id={"iframe-model"}
        style={{ height: modelViewContentHeight }}
        className={style.modelIFrame}
        src={"https://innovonto-core.imp.fu-berlin.de/innovonto/types/"}
      />
    </div>
  );
};
