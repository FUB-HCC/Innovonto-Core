import { useWindowSize } from "../utils";
import style from "./solution-map.module.css";
import PropTypes from "prop-types";
import React from "react";

const offset = [10, -10];
export const StaticPopover = props => {
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

export default StaticPopover;
