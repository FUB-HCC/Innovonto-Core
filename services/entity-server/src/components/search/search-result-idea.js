import React from "react";
import LargeEntitiyPreview from "../common/large-entity-preview";
import style from "./search-component.module.css";
import StarRating from "../common/star-rating";
import TextualRefinements from "../common/textual-refinements";
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
        rightContent={<TextualRefinements refinementList={refinements} />}
      />
    </div>
  );
};

export default SearchResultIdea;
