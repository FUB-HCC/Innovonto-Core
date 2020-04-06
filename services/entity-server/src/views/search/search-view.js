import React from "react";
import SearchComponent from "../../components/search/search-component";
import { useQuery, useWindowSize } from "../../components/utils";
import { CenteredLayout } from "../../components/common/page-layouts";
import { footerHeight, headerHeight } from "../../root";

const searchHeight = height => height - headerHeight * 2 - footerHeight - 60; //pageTitleHeight = headerHeight
const searchWidth = width => (width >= 1000 ? 1000 : width - 10);

const SearchView = () => {
  const [windowWidth, windowHeight] = useWindowSize();
  const queryString = useQuery().toString();
  return (
    <CenteredLayout pageTitle={"Search"}>
      <SearchComponent
        key={queryString}
        width={searchWidth(windowWidth)}
        height={searchHeight(windowHeight)}
      />
    </CenteredLayout>
  );
};

export default SearchView;
