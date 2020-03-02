import React from "react";

import style from "./search-view.module.css";
import SearchComponent from "../../components/search/search-component";
import { useWindowSize } from "../../components/utils";

const searchHeight = height => 0.8 * height;
const searchWidth = width => 0.6 * width;

const SearchView = () => {
  const [windowWidth, windowHeight] = useWindowSize();
  return (
    <div className={style.searchPageWrapper}>
      <SearchComponent
        width={searchWidth(windowWidth)}
        height={searchHeight(windowHeight)}
      />
    </div>
  );
};

export default SearchView;
