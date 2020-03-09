import axios from "axios";
import { RequestState } from "../components/utils";
import { batch } from "react-redux";

export const actionTypes = Object.freeze({
  FETCH_SEARCH_DATA: "FETCH_SEARCH_DATA",
  UPDATE_SEARCH_DATA: "UPDATE_SEARCH_DATA",
  FETTCH_SESSION_DATA: "FETCH_SESSION_DATA",
  UPDATE_SESSION_DATA: "UPDATE_SESSION_DATA",
  SET_REQUEST_STATE: "SET_REQUEST_STATE",
  SET_REQUEST_ERROR: "SET_REQUEST_ERROR"
});

const prepareForRequest = dispatch =>
  batch(() => {
    dispatch(setRequestState(RequestState.BUSY));
    dispatch(setRequestError(null));
  });

const handleFailedRequest = (dispatch, error) =>
  batch(() => {
    dispatch(setRequestState(RequestState.FAILED));
    dispatch(setRequestError(error));
  });

export const setRequestState = key => ({
  type: actionTypes.SET_REQUEST_STATE,
  value: key
});

export const setRequestError = error => ({
  type: actionTypes.SET_REQUEST_ERROR,
  value: error
});

export const fetchSearchData = () => {
  return dispatch => {
    batch(() => {
      prepareForRequest(dispatch);
    });
    axios
      .get(process.env.PUBLIC_URL + "/data/mockdata-search.json")
      .then(result => {
        batch(() => {
          dispatch(updateSearchData(result.data));
          dispatch(setRequestState(RequestState.COMPLETED));
        });
      })
      .catch(error => {
        handleFailedRequest(dispatch);
      });
  };
};

export const updateSearchData = searchData => ({
  type: actionTypes.UPDATE_SEARCH_DATA,
  value: searchData
});

export const fetchSessionData = () => {
  return dispatch => {
    prepareForRequest(dispatch);
    axios
      .get(process.env.PUBLIC_URL + "/data/mockdata-session.json")
      .then(result => {
        batch(() => {
          dispatch(updateSessionData(result.data));
          dispatch(setRequestState(RequestState.COMPLETED));
        });
      })
      .catch(error => {
        handleFailedRequest(dispatch, error);
      });
  };
};

export const updateSessionData = sessionData => ({
  type: actionTypes.UPDATE_SESSION_DATA,
  value: sessionData
});
