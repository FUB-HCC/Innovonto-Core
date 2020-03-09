import PropTypes from "prop-types";
import React from "react";

export const ImgWithCaption = props => {
  const { src, altText, figureNo, caption } = props;
  return (
    <>
      <img
        src={src}
        alt={altText}
        style={caption || figureNo ? {} : { marginBottom: "50px" }}
      />
      {(caption || figureNo) && (
        <span style={{ marginBottom: 20 }}>
          {figureNo ? "Figure " + figureNo : ""}
          {figureNo && caption ? ": " : ""}
          {caption ? caption : ""}
        </span>
      )}
    </>
  );
};

ImgWithCaption.propTypes = {
  src: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  caption: PropTypes.string,
  figureNo: PropTypes.number
};

export default ImgWithCaption;
