import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./solution-map.module.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ButtonGroup, Button } from "@blueprintjs/core";
import {
  AltTextComponent,
  makeDimensionsChecker,
  useMousePosition
} from "../utils";
import Sidebar from "./solution-map-sidebar";
import StaticPopover from "./solution-map-static-popover";

export const sideBarWidth = 330;
const mainWindowWidth = totalWidth => totalWidth - sideBarWidth;
const circleRadiusPx = (xRange, yRange) => 0.01 * Math.max(xRange, yRange);
const strokeWidth = (xRange, yRange) => 0.002 * Math.max(xRange, yRange);
const marginsRatio = 0.2;
const minHeight = 450;
const minWidth = 600;
const minAspectRatio = 0.1;
const maxAspectRatio = 2.0;
const areDimensionsReasonable = makeDimensionsChecker(
  minHeight,
  minWidth,
  minAspectRatio,
  maxAspectRatio
);

const getCoordinateRanges = coordList => {
  const xCoords = coordList.map(c => c[0]);
  const yCoords = coordList.map(c => c[1]);
  return [
    Math.min(...xCoords),
    Math.min(...yCoords),
    Math.max(...xCoords),
    Math.max(...yCoords)
  ];
};

const getSelectedCluster = (clusterData, selectedIdea) => {
  if (!selectedIdea || !selectedIdea.clusterLabel) return null;
  return clusterData.find(
    cluster => cluster.clusterLabel === selectedIdea.clusterLabel
  );
};

export const SolutionMap = props => {
  const [hoveredIdea, setHoveredIdea] = useState(null);
  const [clickedIdea, setClickedIdea] = useState(null);
  const [mouseX, mouseY] = useMousePosition();
  const { ideas, width, height, solutionId, clusterData } = props;
  if (!areDimensionsReasonable(width, height) || !ideas) {
    return (
      <AltTextComponent name={"Solution Map"} width={width} height={height} />
    );
  }
  const selectedCluster = getSelectedCluster(clusterData, clickedIdea);
  const coordinateList = ideas.map(idea => idea.coordinates);
  let xRange = 1,
    yRange = 1;
  let minX = 0,
    minY = 0,
    maxX = 0,
    maxY = 0;
  if (coordinateList.length > 0) {
    [minX, minY, maxX, maxY] = getCoordinateRanges(coordinateList);
    xRange = maxX - minX;
    yRange = maxY - minY;
  }
  const marginX = xRange * marginsRatio;
  const marginY = yRange * marginsRatio;

  return (
    <div className={style.solutionMapWrapper}>
      <TransformWrapper style={{ width: width, height: height }}>
        {({ zoomIn, zoomOut, resetTransform, ...args }) => {
          const { scale } = args;
          return (
            <div className={style.zoomWindowWrapper}>
              <Sidebar
                solutionId={solutionId}
                selectedIdea={clickedIdea}
                selectedCluster={selectedCluster}
                width={sideBarWidth}
                height={height}
              />
              <div>
                <ButtonGroup minimal={true} className={style.toolBar}>
                  <Button icon={"zoom-in"} onClick={zoomIn} />
                  <Button icon={"zoom-out"} onClick={zoomOut} />
                  <Button icon={"zoom-to-fit"} onClick={resetTransform} />
                </ButtonGroup>
                {hoveredIdea && (
                  <StaticPopover
                    x={mouseX}
                    y={mouseY}
                    content={hoveredIdea.content}
                  />
                )}
                <TransformComponent>
                  <svg
                    width={mainWindowWidth(width)}
                    height={height}
                    viewBox={
                      minX +
                      " " +
                      minY +
                      " " +
                      (xRange + 2 * marginX) +
                      " " +
                      (yRange + 2 * marginY)
                    }
                    className={style.zoomBox}
                  >
                    {ideas.map(idea => {
                      const [x, y] = idea.coordinates;
                      return (
                        <circle
                          onMouseEnter={() => setHoveredIdea(idea)}
                          onMouseLeave={() => setHoveredIdea(null)}
                          className={style.basicCircle}
                          r={circleRadiusPx(xRange, yRange) / scale}
                          strokeWidth={strokeWidth(xRange, yRange) / scale}
                          key={idea.idea}
                          cx={x + marginX}
                          cy={y + marginY}
                          onClick={() => setClickedIdea(idea)}
                        />
                      );
                    })}
                  </svg>
                </TransformComponent>
              </div>
            </div>
          );
        }}
      </TransformWrapper>
    </div>
  );
};

SolutionMap.propTypes = {
  solutionId: PropTypes.string.isRequired,
  ideas: PropTypes.arrayOf(PropTypes.object),
  clusterData: PropTypes.arrayOf(PropTypes.object),
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

export default SolutionMap;
