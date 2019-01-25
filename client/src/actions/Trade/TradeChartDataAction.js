// Actions For Trade Chart Data By Tejas Date :25/9/2018

// import types
import {
  GET_CHART_DATA,
  GET_CHART_DATA_SUCCESS,
  GET_CHART_DATA_FAILURE
} from "Actions/types";

//action for geChart Data and set type for reducers
export const getChartData = payload => ({
  type: GET_CHART_DATA,
  payload:  payload 
});

//action for set Success and Chart Data and set type for reducers
export const getChartDataSuccess = response => ({
  type: GET_CHART_DATA_SUCCESS,
  payload: response.response
});

//action for set failure and error to Chart Data and set type for reducers
export const getChartDataFailure = error => ({
  type: GET_CHART_DATA_FAILURE,
  payload: error
});
