import { fetchSearchData } from "../../store/actions";
import { connect } from "react-redux";
import React from "react";
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
  pageAction,
  requestState as requestStates,
  AppToaster,
  makeDimensionsChecker,
  AltTextComponent
} from "../utils";
import SearchResultList from "./search-result-list";
import SearchResultGrid from "./search-result-grid";
import SearchResultIdea from "./search-result-idea";

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

const resultsPerPageTypes = Object.freeze({
  LIST: 10,
  GRID: 6,
  IDEA: 1
});

const radio = Object.freeze({
  LIST: "LIST",
  GRID: "GRID",
  IDEA: "IDEA"
});

const computeMaxPage = (nResults, resultsPerPage) =>
  Math.floor((nResults - 1) / resultsPerPage);

const filterResultsOfPage = (results, page, resultsPerPage) =>
  results.slice(page * resultsPerPage, (page + 1) * resultsPerPage);

const SearchResultMessage = props => (
  <div className={style.resultMessageWrapper}>{props.children}</div>
);

class SearchComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      radioSelection: radio.LIST,
      inputValue: "",
      requestInputValue: "",
      page: 0,
      maxPage: 0,
      nResults: 0,
      resultsPerPage: resultsPerPageTypes.LIST
    };
    this.handleRadio = this.handleRadio.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handlePageAction = this.handlePageAction.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.searchResults && props.searchResults.length !== state.nResults) {
      return {
        maxPage: computeMaxPage(
          props.searchResults.length,
          state.resultsPerPage
        ),
        nResults: props.searchResults.length
      };
    }
    return null;
  }

  handleRadio(key) {
    this.setState({
      radioSelection: key,
      resultsPerPage: resultsPerPageTypes[key],
      maxPage: computeMaxPage(
        this.props.searchResults.length,
        resultsPerPageTypes[key]
      ),
      page: 0
    });
  }

  handleInput(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit() {
    if (this.state.inputValue.length >= 2) {
      this.setState({ requestInputValue: this.state.inputValue });
      this.props.fetchData();
    } else {
      AppToaster.show({
        message: "Search string must have at least 2 characters!",
        intent: Intent.DANGER,
        timeout: 3000
      });
    }
  }

  handlePageAction(action) {
    const { maxPage, page } = this.state;
    switch (action) {
      case pageAction.LEFT:
        this.setState({ page: 0 < page ? page - 1 : page });
        break;
      case pageAction.RIGHT:
        this.setState({ page: maxPage > page ? page + 1 : page });
        break;
      case pageAction.START:
        this.setState({ page: 0 });
        break;
      case pageAction.END:
        this.setState({ page: maxPage });
        break;
      default:
        break;
    }
  }

  render() {
    const {
      width,
      height,
      searchResults,
      requestState,
      requestError
    } = this.props;
    const {
      radioSelection,
      inputValue,
      requestInputValue,
      page,
      resultsPerPage,
      nResults
    } = this.state;
    if (!areDimensionsReasonable(width, height)) {
      return (
        <AltTextComponent
          name={"Session Graph"}
          width={width}
          height={height}
        />
      );
    }
    const resultsCurrentPage = filterResultsOfPage(
      searchResults,
      page,
      resultsPerPage
    );

    const innerHeight = height - headerHeight - footerHeight;

    const searchHeader = (
      <div
        className={style.searchHeaderWrapper}
        style={{ height: headerHeight }}
      >
        <input
          className={style.searchInput}
          value={inputValue}
          onChange={this.handleInput}
        />
        <Button minimal={true} text={"search"} onClick={this.handleSubmit} />
        <Divider />
        <ButtonGroup>
          <Button
            minimal={true}
            text={"list"}
            active={radioSelection === radio.LIST}
            onClick={() => this.handleRadio(radio.LIST)}
          />
          <Button
            minimal={true}
            text={"grid"}
            active={radioSelection === radio.GRID}
            onClick={() => this.handleRadio(radio.GRID)}
          />
          <Button
            minimal={true}
            text={"idea"}
            active={radioSelection === radio.IDEA}
            onClick={() => this.handleRadio(radio.IDEA)}
          />
        </ButtonGroup>
        <Divider />
        <Button minimal={true} text={"export"} />
      </div>
    );

    const searchBody = (
      <div className={style.searchBodyWrapper} style={{ height: innerHeight }}>
        <>
          {requestState === requestStates.COMPLETED && (
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
              {radioSelection === radio.LIST && (
                <SearchResultList results={resultsCurrentPage} width={width} />
              )}
              {radioSelection === radio.GRID && (
                <SearchResultGrid
                  results={resultsCurrentPage}
                  height={height - headerHeight - footerHeight}
                  width={width}
                />
              )}
              {radioSelection === radio.IDEA && (
                <SearchResultIdea
                  results={resultsCurrentPage}
                  nResults={nResults}
                />
              )}
            </>
          )}
          {requestState === requestStates.IDLE && (
            <SearchResultMessage>
              <span>
                Search for Ideas in the Full Dataset.
                <br /> For example, search for all Ideas containing “animal”.
              </span>
            </SearchResultMessage>
          )}
          {requestState === requestStates.FAILED && (
            <SearchResultMessage>
              <span>
                {" "}
                We encountered the following error during your search: <br />{" "}
                <b>{requestError.toString()}</b> <br />
                Please try again.
              </span>
            </SearchResultMessage>
          )}
          {requestState === requestStates.BUSY && (
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
          onPageAction={key => this.handlePageAction(key)}
          page={page}
          footerHeight={footerHeight}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  searchResults: state.data.searchResults,
  requestState: state.data.requestState,
  requestError: state.data.requestError,
  height: ownProps.height,
  width: ownProps.width
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => {
    dispatch(fetchSearchData());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
