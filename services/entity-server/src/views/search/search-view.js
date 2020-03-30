import React from "react";

import style from "./search-view.module.css";
import SearchComponent from "../../components/search/search-component";
import { useWindowSize } from "../../components/utils";
import PageTitle from "../../components/common/page-title";

const searchHeight = height => 0.83 * height;
const searchWidth = width => (width >= 1000 ? 1000 : width - 10);

const SearchView = () => {
  const [windowWidth, windowHeight] = useWindowSize();
  return (
    <div className={style.searchViewWrapper}>
      <PageTitle title={"Search"} />
      <div className={style.searchViewContent}>
        <SearchComponent
          width={searchWidth(windowWidth)}
          height={searchHeight(windowHeight)}
        />
      </div>
    </div>
  );
};

export default SearchView;
