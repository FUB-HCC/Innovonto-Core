import { Position, Toaster } from "@blueprintjs/core";
import { useEffect, useLayoutEffect, useState } from "react";
import React from "react";
import style from "./utils.module.css";
import { useParams, useLocation } from "react-router-dom";

export const pageAction = Object.freeze({
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  START: "START",
  END: "END"
});

export const RequestState = Object.freeze({
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

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);
const scrollToTop = () => window.scrollTo(0, 0);

export const useScrollToParagraph = listOfKeywordAndRefPairs => {
  let { paragraph } = useParams();
  let currentRef = listOfKeywordAndRefPairs.filter(keywordAndRefPair => {
    const [keyword] = keywordAndRefPair;
    return keyword === paragraph;
  });
  useEffect(
    () =>
      currentRef.length === 0 ? scrollToTop() : scrollToRef(currentRef[0][1]),
    [paragraph, currentRef]
  );
};

export const useMousePosition = () => {
  const [position, setPosition] = useState([0, 0]);
  useEffect(() => {
    const setFromEvent = e => setPosition([e.clientX, e.clientY]);
    window.addEventListener("mousemove", setFromEvent);
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);
  return position;
};

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
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

export const getNameFromUri = uri => {
  const splitUri = uri.split("/");
  return splitUri[splitUri.length - 1];
};

//TODO debug feature, either remove or generify
export const urlToEntity = url => {
  if (url.startsWith("http://localhost:3000/entities/")) {
    return (
      "https://innovonto-core.imp.fu-berlin.de/entities/" +
      url.substring("http://localhost:3000/entities/".length, url.length)
    );
  } else {
    return url;
  }
};
