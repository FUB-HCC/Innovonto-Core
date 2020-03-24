import LargeEntitiyPreview from "../common/large-entity-preview";
import style from "./info-panel.module.css";
import TextualRefinements from "../common/textual-refinements";
import { Link } from "react-router-dom";
import { getNameFromUri } from "../utils";
import moment from "moment";
import StarRating from "../common/star-rating";
import CategoryList from "../common/category-list";
import React from "react";
import PropTypes from "prop-types";

const InfoPanel = props => {
  const {
    icon,
    creator,
    created,
    hasChallenge,
    hasIdeaContest,
    hasReview,
    hasSubmissionMethod,
    refinements,
    hasCategory
  } = props.idea;
  return (
    <LargeEntitiyPreview
      description={""}
      hideTitle={true}
      hideDescription={true}
      imgSrc={icon && icon.includes("http") ? icon : null}
      leftContent={
        <div className={style.metaDataWrapper}>
          {creator && <CreatedBy user={creator} />}
          {created && <CreatedAt date={created} />}
          {hasChallenge && <CreatedFor project={hasChallenge} />}
          {!hasChallenge && hasIdeaContest && (
            <CreatedFor project={hasIdeaContest} />
          )}
        </div>
      }
      rightContent={
        <div className={style.additionalContentWrapper}>
          {!hasReview &&
            !hasSubmissionMethod &&
            !refinements &&
            !hasCategory(<p>There is no additional information available! </p>)}
          {(hasReview || hasSubmissionMethod || refinements || hasCategory) && (
            <h2>ADDITIONAL INFORMATION</h2>
          )}
          {hasCategory && (
            <div className={style.horizontalDivider}>
              <CategoryList
                categoryList={hasCategory.map(cat =>
                  decodeURIComponent(getNameFromUri(cat))
                )}
              />
            </div>
          )}
          {refinements && (
            <div className={style.horizontalDivider}>
              <TextualRefinements
                refinementList={refinements}
                showTitle={true}
              />
            </div>
          )}
          {hasSubmissionMethod && (
            <div className={style.horizontalDivider}>
              <SubmissionMethod submissionMethod={hasSubmissionMethod} />
            </div>
          )}

          {hasReview && (
            <div className={style.horizontalDivider}>
              <ReviewList reviewList={hasReview} />
            </div>
          )}
        </div>
      }
    />
  );
};

export const CreatedBy = props => (
  <p>
    Created By User{" "}
    <Link to={"/entities/users/" + getNameFromUri(props.user)}>
      {getNameFromUri(props.user)}
    </Link>
  </p>
);

export const CreatedAt = props => (
  <p> {moment(props.date).format("MMMM Do YYYY, h:mm a")}</p>
);

export const CreatedFor = props => (
  <p>
    for the project{" "}
    <Link to={"/entities/challenges/" + getNameFromUri(props.project)}>
      {getNameFromUri(props.project)}
    </Link>{" "}
  </p>
);

export const SubmissionMethod = props => (
  <>
    <h3>Submission Method: </h3>{" "}
    <Link
      to={
        "/entities/submissionMethods/" + getNameFromUri(props.submissionMethod)
      }
    >
      <p>{getNameFromUri(props.submissionMethod)}</p>
    </Link>
  </>
);

const ReviewList = props => (
  <>
    <h3>Reviews:</h3>
    {props.reviewList.map((review, i) => (
      <div key={review.description + i} className={style.reviewWrapper}>
        {review.hasCreator && <CreatedBy user={review.hasCreator} />}
        <p>{review.description}</p>
        {review.ratingValue && (
          <StarRating rating={parseFloat(review.ratingValue)} />
        )}
      </div>
    ))}
  </>
);

InfoPanel.propTypes = {
  idea: PropTypes.object.isRequired
};

export default InfoPanel;
