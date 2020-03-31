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
    avgRatingValue,
    content
  } = props.results[0];
  var refinements;
  if(props.results[0].refinements) {
    refinements = props.results[0].refinements;
  } else {
    refinements = [];
  }
  return (
    <div className={style.resultIdeaWrapper}>
      <div className={style.resultIdeaCounter}>
        <div>
          IDEA {resultNo} OF {props.nResults}
        </div>
      </div>
      <LargeEntitiyPreview
        description={content}
        title={title}
        imgSrc={icon}
        leftContent={
          avgRatingValue && (
            <div className={style.resultIdeaRating}>
              <h3>RATING</h3>
              <StarRating rating={avgRatingValue} />
            </div>
          )
        }
        rightContent={<TextualRefinements refinementList={refinements} />}
      />
    </div>
  );
};

export default SearchResultIdea;
