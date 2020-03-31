import React from "react";
import style from "./search-component.module.css";

const nLinesShown = 2;
const textSize = 9;
const clipText = (text, width, nLines) =>
  text.slice(0, nLines * (width / textSize)) +
  (text.length > nLines * (width / textSize) ? " ..." : "");

const SearchResultList = props => (
  <div className={style.resultListWrapper}>
    {props.results.map(result => (
      <div className={style.listItem} key={result.id}>
        <span className={style.listText}>
          {clipText(result.content, props.width, nLinesShown)}
        </span>
      </div>
    ))}
  </div>
);

export default SearchResultList;
