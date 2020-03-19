import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./entity-marker.module.css";
import { Popover, PopoverInteractionKind } from "@blueprintjs/core";

const imgHeight = 150;
const imgMaxWidth = 300; //overflow is cut

const mapComponentToContent = content => {
  if (!content || typeof content !== "string") {
    return <div className={style.noContent}> No Content Provided!</div>;
  } else if (content.includes("</div>")) {
    return <ImageContent img={content} />;
  } else {
    return <div className={style.stringContent}>{content}</div>;
  }
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

export const EntityMarker = props => {
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
        popoverClassName={style.popover}
        isOpen={isOpen}
        onInteraction={onInteraction}
        interactionKind={PopoverInteractionKind.CLICK}
        content={mapComponentToContent(content)}
        target={marker}
      />
    </div>
  );
};

EntityMarker.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  marker: PropTypes.element.isRequired,
  content: PropTypes.any
};

export default EntityMarker;
