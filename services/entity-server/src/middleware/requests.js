import axios from "axios";
import { SearchActionTypes } from "../components/search/search-component";
import {
  extractEvents,
  extractProjectList,
  extractSearchResults
} from "./data-transforms";

export const requestSearchData = (requestValue, dispatch) => {
  dispatch({
    type: SearchActionTypes.SEARCH_REQUEST_SUBMIT,
    value: requestValue
  });
  axios
    .get(process.env.PUBLIC_URL + "/data/mockdata-search.json")
    .then(result => {
      dispatch({
        type: SearchActionTypes.RESULTS_RECEIVED,
        value: extractSearchResults(result.data)
      });
    })
    .catch(error => {
      dispatch({
        type: SearchActionTypes.REQUEST_ERROR,
        value: error
      });
    });
};

export const requestSessionData = dispatch => {
  axios
    .get(process.env.PUBLIC_URL + "/data/mockdata-session.json")
    .then(result => {
      dispatch(extractEvents(result.data));
    })
    .catch(error => {
      //TODO: make all components redirect to error page in a unified fashion <- input required
    });
};

export const requestProjectListData = dispatch => {
  axios
    .get(process.env.PUBLIC_URL + "/data/mockdata-projects-list.json")
    .then(result => {
      dispatch(extractProjectList(result.data));
    })
    .catch(error => {
      //TODO: make all components redirect to error page in a unified fashion <- input required
    });
};
