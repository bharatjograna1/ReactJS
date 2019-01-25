import {
    GET_DATA,
    DATA_RECEIVED,

    ADD_DATA,
    ADD_DATA_SUCCESS,

    DELETE_DATA,
    DELETE_DATA_SUCCESS
} from "Actions/types";

//Set Initial State
const INITIAL_STATE = {
    tablelist: [],
    addDataTable: [],
};


export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        // to request the data show of api
        case GET_DATA:
            return { ...state, loading: true };

        // to carry responce of data show request
        case DATA_RECEIVED:
            return { ...state, tablelist: action.payload, loading: false };

        // to add data in api table
        case ADD_DATA:
            return { ...state, addDataTable: action.payload, loading: true };

        // to carry responce of data add request
        case ADD_DATA_SUCCESS:
            return { ...state, addtablelistsuccess: action.payload, loading: false };

        // to delete data of api table 
        case DELETE_DATA:
            return { ...state, deletetablelist: action.payload, loading: true };

        // to carry responce of data delete request
        case DELETE_DATA_SUCCESS:
            return { ...state, deletetablelistsuccess: action.payload, loading: false };

        default:
            return { ...state };

    }
};
