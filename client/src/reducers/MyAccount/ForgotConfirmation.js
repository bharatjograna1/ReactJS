/**
 * Auther : Kevin Ladani
 * Created : 27/10/2018
 * Forgot Confirmation Reducers
 */
import {
    FORGOT_CONFIRMATION,
    FORGOT_CONFIRMATION_SUCCESS,
    FORGOT_CONFIRMATION_FAILURE,
 } from 'Actions/types'; 
 
 /*
 * Initial State
 */
const INIT_STATE = {
    loading : false,
    data : [],
    error : ''
}

//Check Action for Forgot Confirmation...
export default (state = INIT_STATE, action) => {
    switch(action.type) 
    {
        case FORGOT_CONFIRMATION:
            return { ...state, loading : true, data : '' };

        case FORGOT_CONFIRMATION_SUCCESS:
            return { ...state, loading : false, data : action.payload };

        case FORGOT_CONFIRMATION_FAILURE:
            return { ...state, loading : false, data : action.payload };

        default : 
            return { ...state };
    }
}