import React from "react";
import PropTypes from "prop-types";
import style from "./textual-refinements.module.css";

const TextualRefinements = props => {
  const { refinementList, showTitle } = props;
  return (
    <>
      {showTitle && <h3>Textual Refinements</h3>}
      {refinementList.map(refinement => (
        <div key={refinement.question}>
          <div className={style.refinement}>{refinement.question}</div>
          <p>{refinement.answer}</p>
        </div>
      ))}
    </>
  );
};

TextualRefinements.propTypes = {
  refinementList: PropTypes.arrayOf(PropTypes.object).isRequired,
  showTitle: PropTypes.bool
};

export default TextualRefinements;
