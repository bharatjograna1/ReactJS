/* 
    Developer : Nishant Vadgama
    Date : 13-09-2018
    File Comment : Withdraw History Reducer action manager
*/
import { NotificationManager } from 'react-notifications';
// import only required withdraw history actions
import {
    GET_WITHDRAW_HISTORY,
    GET_WITHDRAW_HISTORY_SUCCESS,
    GET_WITHDRAW_HISTORY_FAILURE,
} from 'Actions/types';


//Set Initial State
const INITIAL_STATE = {
    withdrawhistory: [],
    withdrawhistoryLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_WITHDRAW_HISTORY:
            return { ...state, withdrawhistoryLoading : true };

        case GET_WITHDRAW_HISTORY_SUCCESS:
            return { ...state, withdrawhistoryLoading : false, withdrawhistory: action.payload };

        case GET_WITHDRAW_HISTORY_FAILURE:
            return { ...state, withdrawhistoryLoading : false, withdrawhistory : [] };

        default: return { ...state };
    }
}