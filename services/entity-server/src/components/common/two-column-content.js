import style from "./two-column-content.module.css";
import PropTypes from "prop-types";
import React from "react";

export const TwoColumnContent = props => {
  const { left, right, title, titleSize } = props;
  return (
    <div className={style.twoColumnContentWrapper}>
      <div
        className={style.twoColumnTitle}
        style={{
          fontSize: titleSize,
          marginBottom: titleSize ? titleSize : 8
        }}
      >
        {title}
      </div>
      <div className={style.twoColumnLeft}>{left}</div>
      <div className={style.twoColumnRight}>{right}</div>
    </div>
  );
};

TwoColumnContent.propTypes = {
  left: PropTypes.element.isRequired,
  right: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  titleSize: PropTypes.number
};

export default TwoColumnContent;
