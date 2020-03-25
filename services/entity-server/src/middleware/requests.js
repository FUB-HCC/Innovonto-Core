import axios from "axios";
import { SearchActionTypes } from "../components/search/search-component";
import {
  processSession,
  extractProjectList,
  extractSearchResults,
  extractSolutionData,
  extractIdeaDetails,
  sortResources,
  extractUserDetails
} from "./data-transforms";
import {
  sparqlProjectListRequest,
  describeEntityRequest,
  describeSessionRequest,
  describeIdeaRequest, describeUserRequest
} from "./sparql-queries";
import { frameData } from "./data-framing";

const backendServiceBaseUrl =
  "https://innovonto-core.imp.fu-berlin.de/management/core/query";

const baseUrl = "https://innovonto-core.imp.fu-berlin.de";

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

export const requestSessionData = (entityId, dispatch) => {
  axios
    .get(backendServiceBaseUrl, describeSessionRequest(entityId))
    .then(result => {
      frameData(result.data, "inov:BrainstormingSession").then(data => {
        //console.log(data);
        const processedResult = processSession(data);
        console.log(processedResult);
        dispatch(processedResult);
      });
    })
    .catch(error => {
      //TODO: make all components redirect to error page in a unified fashion <- input required
    });
};

export const requestProjectListData = dispatch => {
  axios
    .get(backendServiceBaseUrl, sparqlProjectListRequest())
    .then(result => {
      frameData(result.data, "gi2mo:IdeaContest").then(data => {
        dispatch(extractProjectList(data));
      });
    })
    .catch(error => {
      //TODO: make all components redirect to error page in a unified fashion <- input required
    });
};

export const requestSolutionData = (id, dispatch) => {
  var requestUrl;
  if (id === "i2m-TCO") {
    requestUrl = process.env.PUBLIC_URL + "/data/mockdata-solution-map.json";
  } else if (id === "i2m-bionic-radar") {
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
    .get(backendServiceBaseUrl, describeIdeaRequest(baseUrl + ideaUrl))
    .then(result => {
      frameData(result.data, "gi2mo:Idea").then(data =>
        dispatch(extractIdeaDetails(data))
      );
    });
};

export const requestUserDetailData = (id, dispatch) => {
  let entityUrl = baseUrl + "/entities/users/" + id;
  console.log(entityUrl);
  axios
    .get(backendServiceBaseUrl,describeUserRequest(entityUrl))
    .then(result => {
      dispatch(extractUserDetails(result.data));
    })
    .catch(error => {
      //TODO: make all components redirect to error page in a unified fashion <- input required
    });
};

export const requestGenericEntity = (entityUrl, dispatch) => {
  axios
    .get(backendServiceBaseUrl, describeEntityRequest(entityUrl))
    .then(result => {
      dispatch(sortResources(result.data.results.bindings));
    });
};
