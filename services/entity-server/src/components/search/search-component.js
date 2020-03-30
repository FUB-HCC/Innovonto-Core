import React, { useReducer, useState } from "react";
import style from "./search-component.module.css";
import {
  Button,
  Divider,
  ButtonGroup,
  Spinner,
  Intent
} from "@blueprintjs/core";
import SearchPaging from "./search-paging";
import {
  RequestState,
  AppToaster,
  makeDimensionsChecker,
  AltTextComponent
} from "../utils";
import SearchResultList from "./search-result-list";
import SearchResultGrid from "./search-result-grid";
import SearchResultIdea from "./search-result-idea";
import { requestSearchData } from "../../middleware/requests";

const headerHeight = 50;
const footerHeight = 50;

const minHeight = 450;
const minWidth = 450;
const minAspectRatio = 0.4;
const maxAspectRatio = 2.3;
const areDimensionsReasonable = makeDimensionsChecker(
  minHeight,
  minWidth,
  minAspectRatio,
  maxAspectRatio
);

const computeMaxPage = (nResults, resultsPerPage) =>
  Math.floor((nResults - 1) / resultsPerPage);

const filterResultsOfPage = (results, page, resultsPerPage) =>
  results.slice(page * resultsPerPage, (page + 1) * resultsPerPage);

const SearchResultMessage = props => (
  <div className={style.resultMessageWrapper}>{props.children}</div>
);

const Radio = Object.freeze({
  LIST: 10,
  GRID: 6,
  IDEA: 1
});

export const SearchActionTypes = Object.freeze({
  PAGE_LEFT: "LEFT",
  PAGE_RIGHT: "RIGHT",
  PAGE_START: "START",
  PAGE_END: "END",
  SEARCH_REQUEST_SUBMIT: "SEARCH_REQUEST_SUBMIT",
  RESULTS_RECEIVED: "RESULTS_RECEIVED",
  REQUEST_ERROR: "REQUEST_ERROR",
  RADIO_BUTTON_PRESSED: "RADIO_BUTTON_PRESSED"
});

const initialStateSearch = {
  searchResults: [],
  requestState: RequestState.IDLE,
  requestError: null,
  radioSelection: Radio.LIST,
  requestInputValue: "",
  page: 0,
  maxPage: 0
};

const searchReducer = (state, action) => {
  const { maxPage, page, radioSelection } = state;
  switch (action.type) {
    case SearchActionTypes.PAGE_LEFT:
      return { ...state, page: 0 < page ? page - 1 : page };
    case SearchActionTypes.PAGE_RIGHT:
      return { ...state, page: maxPage > page ? page + 1 : page };
    case SearchActionTypes.PAGE_START:
      return { ...state, page: 0 };
    case SearchActionTypes.PAGE_END:
      return { ...state, page: maxPage };
    case SearchActionTypes.SEARCH_REQUEST_SUBMIT:
      return {
        ...state,
        requestState: RequestState.BUSY,
        requestInputValue: action.value,
        requestError: null
      };
    case SearchActionTypes.RESULTS_RECEIVED:
      return {
        ...state,
        requestState: RequestState.COMPLETED,
        searchResults: action.value,
        page: 0,
        maxPage: computeMaxPage(action.value.length, radioSelection)
      };
    case SearchActionTypes.REQUEST_ERROR:
      return { ...state, requestState: RequestState.FAILED };
    case SearchActionTypes.RADIO_BUTTON_PRESSED:
      return {
        ...state,
        radioSelection: action.value,
        page: 0,
        maxPage: computeMaxPage(state.searchResults.length, action.value)
      };
    default:
      return state;
  }
};

export const SearchComponent = props => {
  const { width, height } = props;
  const [inputValue, setInputValue] = useState("");
  const [searchState, dispatchSearchAction] = useReducer(
    searchReducer,
    initialStateSearch
  );
  const {
    requestState,
    requestError,
    radioSelection,
    requestInputValue,
    page,
    searchResults
  } = searchState;

  if (!areDimensionsReasonable(width, height)) {
    return (
      <AltTextComponent name={"Session Graph"} width={width} height={height} />
    );
  }
  const innerHeight = height - headerHeight - footerHeight;
  const resultsCurrentPage = filterResultsOfPage(
    searchResults,
    page,
    radioSelection
  );

  const onSubmit = () => {
    if (inputValue.length >= 2) {
      requestSearchData(inputValue, dispatchSearchAction);
    } else {
      AppToaster.show({
        message: "Search string must have at least 2 characters!",
        intent: Intent.DANGER,
        timeout: 3000
      });
    }
  };

  const onRadioClick = radio => {
    dispatchSearchAction({
      type: SearchActionTypes.RADIO_BUTTON_PRESSED,
      value: radio
    });
  };

  const searchHeader = (
    <div className={style.searchHeaderWrapper} style={{ height: headerHeight }}>
      <input
        className={style.searchInput}
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
      />
      <Button minimal={true} text={"search"} onClick={onSubmit} />
      <Divider />
      <ButtonGroup>
        <Button
          minimal={true}
          text={"list"}
          active={radioSelection === Radio.LIST}
          onClick={() => onRadioClick(Radio.LIST)}
        />
        <Button
          minimal={true}
          text={"grid"}
          active={radioSelection === Radio.GRID}
          onClick={() => onRadioClick(Radio.GRID)}
        />
        <Button
          minimal={true}
          text={"idea"}
          active={radioSelection === Radio.IDEA}
          onClick={() => onRadioClick(Radio.IDEA)}
        />
      </ButtonGroup>
      <Divider />
      <Button disabled minimal={true} text={"export"} />
    </div>
  );

  const searchBody = (
    <div className={style.searchBodyWrapper} style={{ height: innerHeight }}>
      <>
        {requestState === RequestState.COMPLETED && (
          <>
            {searchResults.length === 0 && (
              <SearchResultMessage>
                <span>
                  We couldn’t find any ideas containing the text "
                  {requestInputValue}".
                  <br />
                  Please try again with another search term.
                </span>
              </SearchResultMessage>
            )}
            {radioSelection === Radio.LIST && (
              <SearchResultList results={resultsCurrentPage} width={width} />
            )}
            {radioSelection === Radio.GRID && (
              <SearchResultGrid
                results={resultsCurrentPage}
                height={height - headerHeight - footerHeight}
                width={width}
              />
            )}
            {radioSelection === Radio.IDEA && (
              <SearchResultIdea
                results={resultsCurrentPage}
                nResults={searchResults.length}
              />
            )}
          </>
        )}
        {requestState === RequestState.IDLE && (
          <SearchResultMessage>
            <span>
              Search for Ideas in the Full Dataset.
              <br /> For example, search for all Ideas containing “animal”.
            </span>
          </SearchResultMessage>
        )}
        {requestState === RequestState.FAILED && (
          <SearchResultMessage>
            <span>
              {" "}
              We encountered the following error during your search: <br />{" "}
              <b>{requestError.toString()}</b> <br />
              Please try again.
            </span>
          </SearchResultMessage>
        )}
        {requestState === RequestState.BUSY && (
          <SearchResultMessage>
            <Spinner size={70} />
          </SearchResultMessage>
        )}
      </>
    </div>
  );

  return (
    <div
      className={style.searchComponentWrapper}
      style={{ width: width, height: height }}
    >
      {searchHeader}
      {searchBody}
      <SearchPaging
        actionDispatch={dispatchSearchAction}
        page={page}
        footerHeight={footerHeight}
      />
    </div>
  );
};

export default SearchComponent;
