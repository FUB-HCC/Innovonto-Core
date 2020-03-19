import axios from "axios";
import { SearchActionTypes } from "../components/search/search-component";
import {
  extractEvents,
  extractProjectList,
  extractSearchResults,
  extractSolutionData,
  extractIdeaDetails,
  sortResources
} from "./data-transforms";
import { sparqlProjectListRequest, describeEntityRequest, describeIdeaRequest } from "./sparql-queries"
import { frameData } from "./data-framing"

const backendServiceBaseUrl =
  "https://innovonto-core.imp.fu-berlin.de/management/core/query";

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
    .get(backendServiceBaseUrl, sparqlProjectListRequest())
    .then(result => {
      frameData(result.data, "gi2mo:IdeaContest")
        .then(data => {
          dispatch(extractProjectList(data))
        });
    })
    .catch(error => {
      //TODO: make all components redirect to error page in a unified fashion <- input required
    });
};

export const requestSolutionData = (id, dispatch) => {
  var requestUrl;
  if (id === "mockdata") {
    requestUrl = process.env.PUBLIC_URL + "/data/mockdata-solution-map.json";
  } else if (id === "bionic-radar") {
    requestUrl = process.env.PUBLIC_URL + "/data/mockdata-solution-map-2.json";
  } else {
    requestUrl = "";
    //TODO: build URL string from id here
  }
  axios
    .get(requestUrl)
    .then(result => {
      dispatch(extractSolutionData(result.data));
    })
    .catch(error => {
      //TODO: make all components redirect to error page in a unified fashion <- input required
    });
};

export const requestIdeaDetailData = (ideaUrl, dispatch) => {
  axios
    .get(backendServiceBaseUrl, describeIdeaRequest(ideaUrl))
    .then(result => {
      frameData(result.data, "gi2mo:Idea")
        .then(data =>dispatch(extractIdeaDetails(data)));
    })
};

export const requestGenericEntity = (entityUrl, dispatch) => {
  axios
    .get(backendServiceBaseUrl, describeEntityRequest(entityUrl))
    .then(result => {
      dispatch(sortResources(result.data.results.bindings))
    })
};