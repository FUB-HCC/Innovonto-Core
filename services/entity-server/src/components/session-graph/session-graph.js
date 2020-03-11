import React, { useEffect, useState } from "react";

import style from "./session-graph.module.css";
import { Popover, PopoverInteractionKind } from "@blueprintjs/core";
import { AltTextComponent, makeDimensionsChecker } from "../utils";
import { requestSessionData } from "../../middleware/requests";

const marginsSides = width => 0.1 * width;

const minHeight = 250;
const minWidth = 250;
const minAspectRatio = 0.1;
const maxAspectRatio = 2.0;
const areDimensionsReasonable = makeDimensionsChecker(
  minHeight,
  minWidth,
  minAspectRatio,
  maxAspectRatio
);

const lineHeight = 1;
const timerLength = 1200;
const imgHeight = 150;
const imgMaxWidth = 300; //overflow is cut
const timelineOffsetY = height => (height * 2) / 3;

const minBucketSizePx = 17;
const eventMarkerOffset = 17; //px
const getBucketCount = timeLineWidth =>
  Math.floor(timeLineWidth / minBucketSizePx);
const getActualBucketWidth = timeLineWidth =>
  timeLineWidth / getBucketCount(timeLineWidth);

const minuteTickOffsetUnit = 60; //s
const minMinuteTickPx = 60;

const getMinuteTickCount = (timelineWidth, minuteTickOffset) =>
  Math.round(timerLength / minuteTickOffset) * minMinuteTickPx >
    timelineWidth && timelineWidth > minMinuteTickPx
    ? getMinuteTickCount(timelineWidth, minuteTickOffset + minuteTickOffsetUnit)
    : Math.round(timerLength / minuteTickOffset);

const getActualMinTickOffset = timelineWidth =>
  timelineWidth / getMinuteTickCount(timelineWidth, minuteTickOffsetUnit);

const getActualMinTickSec = timelineWidth =>
  Math.round(
    timerLength / getMinuteTickCount(timelineWidth, minuteTickOffsetUnit)
  );

const generateMinLabels = (count, actualSecOffset) =>
  [...Array(count).keys()]
    .map(i => Math.round((timerLength - i * actualSecOffset) / 60) + " min")
    .slice(1);

const mapEventTypeToShape = eventType => {
  switch (eventType) {
    case "idea-submit":
      return <div className={style.basicDiamond} />;
    case "inspiration-response":
      return <div className={style.basicCircle} />;
    default:
      return <div />;
  }
};

const mapComponentToContent = content => {
  if (!content || typeof content.content !== "string") {
    return <div className={style.noContent}> No Content Provided!</div>;
  } else if (content.content.includes("</div>")) {
    return <ImageContent img={content.content} />;
  } else {
    return <div className={style.stringContent}>{content.content}</div>;
  }
};

const sortEventsIntoBuckets = (timeLineWidth, eventList) => {
  const bucketWidthSecs = timerLength / getBucketCount(timeLineWidth);
  let buckets = {};
  eventList.forEach(sEvent => {
    const bucketN = Math.floor(
      (timerLength - sEvent.timerValue) / bucketWidthSecs
    );
    buckets[bucketN] = buckets[bucketN]
      ? {
          ...buckets[bucketN],
          events: buckets[bucketN].events.concat([sEvent])
        }
      : { n: bucketN, events: [sEvent] };
  });
  return buckets;
};

const SessionGraph = props => {
  const { width, height } = props;
  const [eventList, setEventsList] = useState([]);
  useEffect(() => requestSessionData(setEventsList), []);
  if (!areDimensionsReasonable(width, height)) {
    return (
      <AltTextComponent name={"Session Graph"} width={width} height={height} />
    );
  }
  const timeLineWidth = width - 2 * marginsSides(width);
  const eventBuckets = sortEventsIntoBuckets(timeLineWidth, eventList);
  return (
    <div
      className={style.sessionGraphWrapper}
      style={{ width: width, height: height }}
    >
      <div
        className={style.timeLine}
        style={{
          height: lineHeight,
          width: timeLineWidth,
          left: marginsSides(width),
          top: timelineOffsetY(height)
        }}
      />
      <TickMarks
        timeLineWidth={timeLineWidth}
        spacing={getActualBucketWidth(timeLineWidth)}
        yOffset={timelineOffsetY(height)}
        xOffset={marginsSides(width)}
        style={style.bucketTickMark}
      />
      <TickMarks
        timeLineWidth={timeLineWidth}
        spacing={getActualMinTickOffset(timeLineWidth)}
        yOffset={timelineOffsetY(height)}
        xOffset={marginsSides(width)}
        style={style.minTickMark}
      />
      <TickMarks
        timeLineWidth={timeLineWidth}
        spacing={timeLineWidth}
        yOffset={timelineOffsetY(height)}
        xOffset={marginsSides(width)}
        style={style.startEndTick}
      />
      <Labels
        labels={generateMinLabels(
          getMinuteTickCount(timeLineWidth, minuteTickOffsetUnit),
          getActualMinTickSec(timeLineWidth)
        )}
        spacing={getActualMinTickOffset(timeLineWidth)}
        yOffset={timelineOffsetY(height)}
        xOffset={marginsSides(width)}
        style={style.minLabels}
      />
      {Object.values(eventBuckets).map(bucket => (
        <div
          key={"bucket" + bucket.n}
          className={style.eventBucket}
          style={{
            left:
              (bucket.n + 0.5) * getActualBucketWidth(timeLineWidth) +
              marginsSides(width)
          }}
        >
          {bucket.events.map((sEvent, i) => (
            <EventMarker
              key={sEvent.id}
              cx={0}
              cy={timelineOffsetY(height) - i * eventMarkerOffset}
              marker={mapEventTypeToShape(sEvent.eventType)}
              content={sEvent.content}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const TickMarks = props => (
  <div
    className={style.tickMarksWrap}
    style={{ top: props.yOffset, left: props.xOffset }}
  >
    {[...Array(Math.floor(props.timeLineWidth / props.spacing + 1)).keys()].map(
      bucketTick => (
        <div
          key={bucketTick + props.style}
          className={props.style}
          style={{
            left: props.spacing * bucketTick
          }}
        />
      )
    )}
  </div>
);

const Labels = props => (
  <div
    className={style.labelsWrap}
    style={{ top: props.yOffset, left: props.xOffset + props.spacing }}
  >
    {props.labels.map((label, i) => (
      <div
        key={label}
        className={props.style}
        style={{
          left: props.spacing * i
        }}
      >
        {label}
      </div>
    ))}
  </div>
);

const EventMarker = props => {
  const [isHovered, setHovered] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const onMouseEvent = isEnter => {
    setHovered(isEnter);
    setOpen(isEnter || isClicked);
  };
  const onClick = () => {
    setClicked(!isClicked);
  };
  const onInteraction = wouldOpen => {
    if (!isHovered && isOpen && !wouldOpen) {
      setClicked(false);
      setOpen(false);
    }
  };
  const { cx, cy, marker, content } = props;
  return (
    <div
      className={style.eventMarker}
      style={{ left: cx, top: cy }}
      onMouseEnter={() => onMouseEvent(true)}
      onMouseLeave={() => onMouseEvent(false)}
      onMouseDown={onClick}
    >
      <Popover
        isOpen={isOpen}
        onInteraction={onInteraction}
        interactionKind={PopoverInteractionKind.CLICK}
        content={mapComponentToContent(content)}
        target={marker}
      />
    </div>
  );
};

const ImageContent = props => {
  //const imgSrc = props.img.split('"').find(str => str.includes(".jpg"));
  return (
    <div className={style.imageContent} style={{ maxWidth: imgMaxWidth }}>
      <div className={style.imageFrame}>
        <img
          height={imgHeight}
          src={
            "https://upload.wikimedia.org/wikipedia/commons/1/16/HDRI_Sample_Scene_Balls_%28JPEG-HDR%29.jpg"
          }
          alt={"did not load!"}
        />
      </div>
    </div>
  );
};
//TODO: replace sample image with actual images from backend

export default SessionGraph;
