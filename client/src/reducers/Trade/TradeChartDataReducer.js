// Reducer for Chart Detail Data By Tejas Date: 25/9/2018

import {
    GET_CHART_DATA,
    GET_CHART_DATA_SUCCESS,
    GET_CHART_DATA_FAILURE
}
    from 'Actions/types';

// Set Initial State
const INITIAL_STATE = {
    chartData: [],
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        // get Chart Detail
        case GET_CHART_DATA:
            return { ...state, loading: true };

        // set Data Of  Chart Detail
        case GET_CHART_DATA_SUCCESS:
            return { ...state, chartData: action.payload, loading: false };

        // Display Error for Chart Detail failure
        case GET_CHART_DATA_FAILURE:
            return { ...state, loading: false, chartData: [] };

        default: return { ...state };

    }
}