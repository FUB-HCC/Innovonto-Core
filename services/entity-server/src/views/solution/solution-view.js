import style from "./solution-view.module.css";
import React, { useEffect, useState } from "react";
import { requestSolutionData } from "../../middleware/requests";
import SolutionMap from "../../components/solution-map/solution-map";
import { useWindowSize } from "../../components/utils";
import { useParams } from "react-router-dom";
import { footerHeight, headerHeight } from "../../root";

const solutionHeight = height => height - headerHeight - footerHeight;
const solutionWidth = width => 1 * width;

export const SolutionView = () => {
  let { id } = useParams();
  const [solutionData, setSolutionData] = useState([]);
  useEffect(() => requestSolutionData(id, setSolutionData), [id]);
  const [windowWidth, windowHeight] = useWindowSize();
  return (
    <div className={style.solutionViewWrapper}>
      <div className={style.solutionViewContent}>
        <SolutionMap
          solutionId={id}
          ideas={solutionData.bindings}
          height={solutionHeight(windowHeight)}
          width={solutionWidth(windowWidth)}
        />
      </div>
    </div>
  );
};
