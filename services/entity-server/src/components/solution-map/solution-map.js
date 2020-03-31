import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./solution-map.module.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ButtonGroup, Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import {
  AltTextComponent,
  makeDimensionsChecker,
  useMousePosition
} from "../utils";
import Sidebar from "./solution-map-sidebar";
import StaticPopover from "./solution-map-static-popover";
import { interpolateWarm as d3GetColor } from "d3-scale-chromatic";

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

const ColorSelection = Object.freeze({
  DEFAULT: "None",
  IDEA_TYPE: "Idea Type",
  CLUSTER: "Cluster"
});

const IdeaTypes = Object.freeze({
  Spark: { value: "Spark", color: "royalblue" },
  Idea: { value: "Idea", color: "mediumseagreen" },
  Option: { value: "Option", color: "orangered" }
});

const getSelectedCluster = (clusterData, selectedIdea) => {
  if (!selectedIdea || !selectedIdea.clusterLabel) return null;
  return clusterData.find(
    cluster => cluster.clusterLabel === selectedIdea.clusterLabel
  );
};

const IdeaMapSvg = props => {
  const { ideas, width, height, onIdeaClick, onIdeaHover, zoomScale } = props;
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
    <svg
      width={width}
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
            onMouseEnter={() => onIdeaHover(idea)}
            onMouseLeave={() => onIdeaHover(null)}
            className={style.basicCircle}
            fill={idea.color ? idea.color : "orangered"}
            r={circleRadiusPx(xRange, yRange) / zoomScale}
            strokeWidth={strokeWidth(xRange, yRange) / zoomScale}
            key={idea.idea}
            cx={x + marginX}
            cy={y + marginY}
            onClick={() => onIdeaClick(idea)}
          />
        );
      })}
    </svg>
  );
};

IdeaMapSvg.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  ideas: PropTypes.arrayOf(PropTypes.object).isRequired,
  onIdeaClick: PropTypes.func,
  onIdeaHover: PropTypes.func,
  zoomScale: PropTypes.number.isRequired
};

const getClusterHighlightingColor = (idea, clusterData) =>
  d3GetColor(parseFloat(idea.clusterLabel) / (clusterData.length - 1));

const applyHighlighting = (ideas, highlightingOption, clusterData) => {
  switch (highlightingOption) {
    case ColorSelection.CLUSTER:
      return ideas.map(idea => ({
        ...idea,
        color: getClusterHighlightingColor(idea, clusterData)
      }));
    case ColorSelection.IDEA_TYPE:
      return ideas.map(idea => ({
        ...idea,
        color: IdeaTypes[idea.ideaType]
          ? IdeaTypes[idea.ideaType].color
          : "black"
      }));
    default:
      return ideas;
  }
};

export const SolutionMap = props => {
  const [hoveredIdea, setHoveredIdea] = useState(null);
  const [clickedIdea, setClickedIdea] = useState(null);
  const [highlightingOption, setHighlighting] = useState(
    ColorSelection.DEFAULT
  );
  const [mouseX, mouseY] = useMousePosition();
  const { ideas, width, height, solutionId, clusterData, sideBarWidth } = props;
  if (!areDimensionsReasonable(width, height) || !ideas) {
    return <AltTextComponent name={"Idea Map"} width={width} height={height} />;
  }
  const mainWindowWidth = width - sideBarWidth;
  const selectedCluster = getSelectedCluster(clusterData, clickedIdea);
  const coloredIdeas = applyHighlighting(
    ideas,
    highlightingOption,
    clusterData
  );

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
                <div className={style.toolBar}>
                  <ButtonGroup minimal={true} className={""}>
                    <Button icon={"zoom-in"} onClick={zoomIn} />
                    <Button icon={"zoom-out"} onClick={zoomOut} />
                    <Button icon={"zoom-to-fit"} onClick={resetTransform} />
                    <Select
                      activeItem={highlightingOption}
                      items={Object.values(ColorSelection)}
                      itemRenderer={(item, { handleClick, modifiers }) => (
                        <MenuItem
                          active={modifiers.active}
                          key={item}
                          text={item}
                          onClick={handleClick}
                        />
                      )}
                      onItemSelect={item => setHighlighting(item)}
                      filterable={false}
                    >
                      <Button icon={"highlight"} text={highlightingOption} />
                    </Select>
                  </ButtonGroup>
                </div>
                {hoveredIdea && (
                  <StaticPopover
                    x={mouseX}
                    y={mouseY}
                    content={hoveredIdea.content}
                  />
                )}
                <TransformComponent>
                  <IdeaMapSvg
                    width={mainWindowWidth}
                    height={height}
                    ideas={coloredIdeas}
                    onIdeaClick={setClickedIdea}
                    onIdeaHover={setHoveredIdea}
                    zoomScale={scale}
                  />
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
