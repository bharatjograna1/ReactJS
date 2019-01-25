/**
 * Auther : Salim Deraiya
 * Created : 14/09/2018
 * Personal Verification Form Reducers
 */
import {
    PERSONAL_VERIFICATION,
    PERSONAL_VERIFICATION_SUCCESS,
    PERSONAL_VERIFICATION_FAILURE
 } from 'Actions/types';
 
 
 /*
 * Initial State
 */
const INIT_STATE = {
    loading : false,
    data : []
}

//Check Action for Personal Verification Form...
export default (state = INIT_STATE, action) => {
    switch(action.type) 
    {
        case PERSONAL_VERIFICATION:
            return { ...state, loading : true, data : '' };

        case PERSONAL_VERIFICATION_SUCCESS:
            return { ...state, loading : false, data : action.payload };

        case PERSONAL_VERIFICATION_FAILURE:
            return { ...state, loading : false, data : action.payload };

        default : 
            return { ...state };
    }
}