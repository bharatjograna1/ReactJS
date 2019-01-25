/**
 * Auther : Salim Deraiya
 * Created : 14/09/2018
 * Complain Reducers
 */
import {
    //List Complain
    LIST_COMPLAIN,
    LIST_COMPLAIN_SUCCESS,
    LIST_COMPLAIN_FAILURE,

    //Add Complain
    ADD_COMPLAIN,
    ADD_COMPLAIN_SUCCESS,
    ADD_COMPLAIN_FAILURE,

    //Get Complain By ID
    GET_COMPLAIN_BY_ID,
    GET_COMPLAIN_BY_ID_SUCCESS,
    GET_COMPLAIN_BY_ID_FAILURE,

    //Replay Complain
    REPLAY_COMPLAIN,
    REPLAY_COMPLAIN_SUCCESS,
    REPLAY_COMPLAIN_FAILURE,

    //Get Complain Type
    GET_COMPLAIN_TYPE,
    GET_COMPLAIN_TYPE_SUCCESS,
    GET_COMPLAIN_TYPE_FAILURE,

} from 'Actions/types';


/*
* Initial State
*/
const INIT_STATE = {
    loading: false,
    data: [],
    list: [],
    getList: [],
    getComplainTypeData: []
}

//Check Action for Complain...
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //List Complain..
        case LIST_COMPLAIN:
            return { ...state, loading: true, getList: action.payload };

        case LIST_COMPLAIN_SUCCESS:
            return { ...state, loading: false, getList: action.payload };

        case LIST_COMPLAIN_FAILURE:
            return { ...state, loading: false, error: action.payload };

        //Add Complain..
        case ADD_COMPLAIN:
            return { ...state, loading: true };

        case ADD_COMPLAIN_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case ADD_COMPLAIN_FAILURE:
            return { ...state, loading: false, error: action.payload };

        //Get Complain By ID..
        case GET_COMPLAIN_BY_ID:
            return { ...state, loading: true, list: action.payload };

        case GET_COMPLAIN_BY_ID_SUCCESS:
            return { ...state, loading: false, list: action.payload };

        case GET_COMPLAIN_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload };

        //Replay Complain..
        case REPLAY_COMPLAIN:
            return { ...state, loading: true };

        case REPLAY_COMPLAIN_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case REPLAY_COMPLAIN_FAILURE:
            return { ...state, loading: false, error: action.payload };

        //Get Complain Type Data..
        case GET_COMPLAIN_TYPE:
            return { ...state, loading: true };

        case GET_COMPLAIN_TYPE_SUCCESS:
            return { ...state, loading: false, getComplainTypeData: action.payload };

        case GET_COMPLAIN_TYPE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return { ...state };
    }
}