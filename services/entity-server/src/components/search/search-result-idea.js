import React from "react";
import style from "./search-component.module.css";
import { Icon } from "@blueprintjs/core";

const SearchResultIdea = props => (
  <div className={style.resultIdeaWrapper}>
    {props.results.length > 0 && (
      <>
        <div className={style.resultIdeaCounter}>
          <div>
            IDEA {props.results[0].resultNo} OF {props.nResults}
          </div>
        </div>
        <div className={style.resultIdeaHeader}>
          <div className={style.resultIdeaTitle}>
            {props.results[0].title ? props.results[0].title : "Untitled"}
          </div>
        </div>
        <div className={style.resultIdeaBody}>
          <div className={style.resultIdeaLeft}>
            <div className={style.resultIdeaIconFrame}>
              {props.results[0].icon && (
                <img src={props.results[0].icon} alt={"failed to load"} />
              )}
              {!props.results[0].icon && (
                <div className={style.resultIconPlaceHolder}>
                  <div>NO ICON</div>
                </div>
              )}
            </div>
            {props.results[0].rating && (
              <div className={style.resultIdeaRating}>
                <h3>RATING</h3>
                <StarRating rating={props.results[0].rating} />
              </div>
            )}
          </div>
          <div className={style.resultIdeaRight}>
            <div className={style.resultIdeaContent}>
              <h3> DESCRIPTION </h3>
              <p>{props.results[0].description}</p>
              {props.results[0].refinements.map(refinement => (
                <div key={refinement.id}>
                  <h4>{refinement.question}</h4>
                  <p>{refinement.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )}
  </div>
);

const StarRating = props => (
  <div className={style.RatingWrapper}>
    <div>
      <Icon icon={props.rating >= 0.5 ? "star" : "star-empty"} />
      <Icon icon={props.rating >= 1.5 ? "star" : "star-empty"} />
      <Icon icon={props.rating >= 2.5 ? "star" : "star-empty"} />
      <Icon icon={props.rating >= 3.5 ? "star" : "star-empty"} />
      <Icon icon={props.rating >= 4.5 ? "star" : "star-empty"} />
    </div>
    <span>{Math.round(props.rating)} von 5 Sterne</span>
  </div>
);

export default SearchResultIdea;
