import React from "react";
import SearchComponent from "../../components/search/search-component";
import { useWindowSize } from "../../components/utils";
import { CenteredLayout } from "../../components/common/page-layouts";

const searchHeight = height => 0.83 * height;
const searchWidth = width => (width >= 1000 ? 1000 : width - 10);

const SearchView = () => {
  const [windowWidth, windowHeight] = useWindowSize();
  return (
    <CenteredLayout pageTitle={"Search"}>
      <SearchComponent
        width={searchWidth(windowWidth)}
        height={searchHeight(windowHeight)}
      />
    </CenteredLayout>
  );
};

export default SearchView;
