import { actionTypes } from "./actions";
import { combineReducers } from "redux";
import {
  extractEvents,
  extractExemplars,
  extractIdeas,
  extractInspirations,
  extractSearchResults
} from "./data-transforms";
import { requestState } from "../components/utils";

const initialState = {
  sEvents: [],
  inspirations: [],
  ideas: [],
  exemplars: [],

  searchResults: [],

  requestState: requestState.IDLE,
  requestError: null
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_SESSION_DATA:
      return updateSessionData(state, action);
    case actionTypes.UPDATE_SEARCH_DATA:
      return updateSearchData(state, action);
    case actionTypes.SET_REQUEST_STATE:
      return setRequestState(state, action);
    case actionTypes.SET_REQUEST_ERROR:
      return setRequestError(state, action);
    default:
      return state;
  }
};

const updateSearchData = (state, action) => ({
  ...state,
  searchResults: extractSearchResults(action.value)
});

const updateSessionData = (state, action) => ({
  ...state,
  sEvents: extractEvents(action.value),
  inspirations: extractInspirations(action.value),
  exemplars: extractExemplars(action.value),
  ideas: extractIdeas(action.value)
});

const setRequestState = (state, action) => ({
  ...state,
  requestState: action.value
});

const setRequestError = (state, action) => ({
  ...state,
  requestError: action.value
});

const reducers = combineReducers({ data: dataReducer });

export default reducers;
