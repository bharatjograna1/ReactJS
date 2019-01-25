import {
    GET_DATA,
    DATA_RECEIVED,
    ADD_DATA,
    ADD_DATA_SUCCESS
} from "Actions/types";

// to request the data show of api
export const getData = () => ({
    type: GET_DATA,
});

// to carry responce of data show request
export const receiveData = (responce) => ({
    type: DATA_RECEIVED,
    payload: responce
});

// to add data in api table
export const addData = (data) => ({
    type: ADD_DATA,
    payload: data
});

// to carry responce of data add request
export const addDataSuccess = (data) => ({
    type: ADD_DATA_SUCCESS,
    payload: data
});

// to delete data of api table 
export const deleteData = (data) => ({
    type: DELETE_DATA,
    payload: data
});

// to carry responce of data delete request
export const deleteDataSuccess = (data) => ({
    type: DELETE_DATA_SUCCESS,
    payload: data
});
