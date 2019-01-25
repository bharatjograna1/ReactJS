import {
    GET_STAKHISTORY,
    GET_STAKHISTORY_SUCCESS,
    GET_STAKHISTORY_FAILURE
} from '../types';


export const getStakHistory = (payload) => ({
    type: GET_STAKHISTORY,
    request: payload
})

export const getStakHistorySuccess = (payload) => ({
    type: GET_STAKHISTORY_SUCCESS,
    payload: payload
})

export const getStakHistoryFailure = (error) => ({
    type: GET_STAKHISTORY_FAILURE,
    error: error
})