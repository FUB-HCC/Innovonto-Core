import { Position, Toaster } from "@blueprintjs/core";
import { useLayoutEffect, useState } from "react";
import React from "react";
import style from "./utils.module.css";

export const pageAction = Object.freeze({
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  START: "START",
  END: "END"
});

export const requestState = Object.freeze({
  IDLE: "IDLE",
  BUSY: "BUSY",
  FAILED: "FAILED",
  COMPLETED: "COMPLETED"
});

export const AppToaster = Toaster.create({
  position: Position.TOP
});

//aspect Ratio = height / width
export const makeDimensionsChecker = (
  minHeight,
  minWidth,
  minAspectR,
  maxAspectR
) => (width, height) =>
  width > minWidth &&
  height > minHeight &&
  height / width > minAspectR &&
  height / width < maxAspectR;

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export const AltTextComponent = props => (
  <div
    className={style.altTextComponent}
    style={{ width: props.width, height: props.height }}
  >
    <div className={style.altText}>
      The Component {props.name} does not render. <br /> This is because one of
      its props, most likely size-related is not suitable.
    </div>
  </div>
);
