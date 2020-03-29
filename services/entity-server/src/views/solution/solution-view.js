import style from "./solution-view.module.css";
import React, { useEffect, useState } from "react";
import { requestSolutionData } from "../../middleware/requests";
import SolutionMap from "../../components/solution-map/solution-map";
import { useWindowSize } from "../../components/utils";
import { useParams } from "react-router-dom";
import { footerHeight, headerHeight } from "../../root";
import { FullScreenSideBarLayout } from "../../components/common/page-layouts";

const solutionHeight = height => height - headerHeight - footerHeight;
const solutionWidth = width => 1 * width;
const sideBarWidth = 330;

export const SolutionView = () => {
  let { id } = useParams();
  const [solutionData, setSolutionData] = useState({});
  useEffect(() => requestSolutionData(id, setSolutionData), [id]);
  const [windowWidth, windowHeight] = useWindowSize();
  const solutionDots = solutionData.bindings ? solutionData.bindings : [];
  const clusterData = solutionData.clusters ? solutionData.clusters : [];
  return (
    <FullScreenSideBarLayout
      sideBarWidth={sideBarWidth}
      isLoading={solutionDots.length < 1}
      pageTitle={"Idea Map"}
    >
      <SolutionMap
        sideBarWidth={sideBarWidth}
        solutionId={id}
        ideas={solutionDots}
        clusterData={clusterData}
        height={solutionHeight(windowHeight)}
        width={solutionWidth(windowWidth)}
      />
    </FullScreenSideBarLayout>
  );
};
