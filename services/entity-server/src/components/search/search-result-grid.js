import React from "react";
import style from "./search-component.module.css";

const marginsSides = 25;
const marginsInner = 15;
const gridItemHeaderHeight = 40;
const gridItemPadding = 15;

const SearchResultGrid = props => (
  <div
    className={style.resultGridWrapper}
    style={{
      paddingLeft: marginsSides - marginsInner,
      paddingTop: marginsSides
    }}
  >
    {props.results.map(result => (
      <GridItem
        key={result.id}
        result={result}
        width={(props.width - 2 * marginsSides - marginsInner) / 2}
        height={(props.height - 2 * marginsSides - 2 * marginsInner) / 3}
      />
    ))}
  </div>
);

const GridItem = props => (
  <div
    className={style.gridItem}
    style={{
      width: props.width,
      height: props.height,
      marginLeft: marginsInner,
      marginBottom: marginsInner,
      padding: gridItemPadding
    }}
  >
    <div
      className={style.gridItemHeader}
      style={{ height: gridItemHeaderHeight }}
    >
      <div className={style.gridItemId}>{props.result.id}</div>
      <div className={style.gridItemResultN}>{props.result.resultNo}</div>
    </div>
    <div
      className={style.gridItemBody}
      style={{
        height: props.height - gridItemHeaderHeight - 2 * gridItemPadding
      }}
    >
      <p className={style.gridText}>{props.result.description}</p>
    </div>
  </div>
);

export default SearchResultGrid;
