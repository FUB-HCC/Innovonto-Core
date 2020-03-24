import style from "./large-entity-preview.module.css";
import PropTypes from "prop-types";
import React from "react";

export const LargeEntitiyPreview = props => {
  const {
    imgSrc,
    leftContent,
    description,
    rightContent,
    title,
    hideTitle,
    hideDescription
  } = props;
  return (
    <>
      {!hideTitle && (
        <div className={style.previewHeader}>
          <div className={style.previewTitle}>{title ? title : "Untitled"}</div>
        </div>
      )}
      <div className={style.previewBody}>
        <div className={style.previewLeft}>
          <div className={style.previewImgFrame}>
            {imgSrc && <img src={imgSrc} alt={"failed to load"} />}
            {!imgSrc && (
              <div className={style.previewImgPlaceHolder}>
                <div>NO ICON</div>
              </div>
            )}
          </div>
          {leftContent}
        </div>
        <div className={style.previewRight}>
          <div className={style.previewContent}>
            {!hideDescription && (
              <>
                <h3> DESCRIPTION </h3>
                <p>{description}</p>
              </>
            )}

            {rightContent}
          </div>
        </div>
      </div>
    </>
  );
};

LargeEntitiyPreview.propTypes = {
  imgSrc: PropTypes.string,
  leftContent: PropTypes.element,
  description: PropTypes.string.isRequired,
  rightContent: PropTypes.any,
  title: PropTypes.string,
  hideTitle: PropTypes.bool,
  hideDescription: PropTypes.bool
};

export default LargeEntitiyPreview;
