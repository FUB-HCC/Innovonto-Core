import React from "react";
import LargeEntitiyPreview from "../common/large-entity-preview";
import style from "./search-component.module.css";
import { Icon } from "@blueprintjs/core";

const SearchResultIdea = props => {
  if (props.results.length <= 0) {
    return <div className={style.resultIdeaWrapper} />;
  }
  const {
    resultNo,
    title,
    icon,
    rating,
    refinements,
    description
  } = props.results[0];
  return (
    <div className={style.resultIdeaWrapper}>
      <div className={style.resultIdeaCounter}>
        <div>
          IDEA {resultNo} OF {props.nResults}
        </div>
      </div>
      <LargeEntitiyPreview
        description={description}
        title={title}
        imgSrc={icon}
        leftContent={
          rating && (
            <div className={style.resultIdeaRating}>
              <h3>RATING</h3>
              <StarRating rating={rating} />
            </div>
          )
        }
        rightContent={refinements.map(refinement => (
          <div key={refinement.id}>
            <h4>{refinement.question}</h4>
            <p>{refinement.answer}</p>
          </div>
        ))}
      />
    </div>
  );
};

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
