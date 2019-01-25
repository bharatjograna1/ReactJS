import {
    GET_STAKHISTORY,
    GET_STAKHISTORY_SUCCESS,
    GET_STAKHISTORY_FAILURE
} from 'Actions/types';

//Set Initial State
const INITIAL_STATE = {
    showLoading: false,
    stakHistoryList: [],
    totalCount: 0,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_STAKHISTORY:
            return { ...state, showLoading: true }

        case GET_STAKHISTORY_SUCCESS:
            return { ...state, showLoading: false, stakHistoryList: action.payload.Stakings, totalCount: action.payload.TotalCount }

        case GET_STAKHISTORY_FAILURE:
            return { ...state, showLoading: false, stakHistoryList: [], totalCount: 0 }

        default:
            return { ...state }
    }
}