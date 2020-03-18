import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./solution-map.module.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ButtonGroup, Button } from "@blueprintjs/core";
import {
  AltTextComponent,
  makeDimensionsChecker,
  useMousePosition,
  useWindowSize
} from "../utils";

const sideBarWidth = 300;
const mainWindowWidth = totalWidth => totalWidth - sideBarWidth;
const circleRadiusPx = 1.5;
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

const offset = [10, -10];
const StaticPopover = props => {
  const [windowX, windowY] = useWindowSize();
  const { x, y, content } = props;
  let [xOffset, yOffset] = offset;
  let [translateX, translateY] = [0, 0];
  if (windowX - x < 300) {
    xOffset = -10;
    translateX = -100;
  }
  if (windowY - y < 350) {
    yOffset = 10;
    translateY = -100;
  }
  return (
    <div
      className={style.infoHoverPopover}
      style={{
        top: y + yOffset,
        left: x + xOffset,
        transform: `translate(${translateX}%, ${translateY}%)`
      }}
    >
      <p>{content}</p>
      <p>Click for details.</p>
    </div>
  );
};

StaticPopover.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired
};

export const SolutionMap = props => {
  const [hoveredIdea, setHoveredIdea] = useState(null);
  const [mouseX, mouseY] = useMousePosition();
  const { ideas, width, height, solutionId } = props;
  if (!areDimensionsReasonable(width, height) || !ideas) {
    return (
      <AltTextComponent name={"Solution Map"} width={width} height={height} />
    );
  }
  const coordinateList = ideas.map(idea => idea.coordinates);
  const [minX, minY, maxX, maxY] = getCoordinateRanges(coordinateList);
  const xRange = maxX - minX;
  const yRange = maxY - minY;
  const marginX = xRange * marginsRatio;
  const marginY = yRange * marginsRatio;

  const Sidebar = (
    <div
      className={style.sidebar}
      style={{ width: sideBarWidth, height: height }}
    >
      <h1 className={style.largeTitle}>Solution Map</h1>
      <p className={style.idText}>ID: {solutionId.toUpperCase()}</p>
      <p>(INPUT NEEDED)</p>
    </div>
  );

  return (
    <div className={style.solutionMapWrapper}>
      <TransformWrapper style={{ width: width, height: height }}>
        {({ zoomIn, zoomOut, resetTransform, ...args }) => {
          const { scale } = args;
          return (
            <div className={style.zoomWindowWrapper}>
              {Sidebar}
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
                          r={circleRadiusPx / scale}
                          key={idea.idea}
                          cx={x + marginX}
                          cy={y + marginY}
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
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

export default SolutionMap;
