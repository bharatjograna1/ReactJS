/**
 * Auther : Kevin Ladani
 * Created : 27/10/2018
 * Forgot Confirmation Actions
 */

import {
    FORGOT_CONFIRMATION,
    FORGOT_CONFIRMATION_SUCCESS,
    FORGOT_CONFIRMATION_FAILURE,
} from "../types";


/**
 * Redux Action To Forgot Confirmation
 */
export const forgotConfirmation = (data) => ({
    type: FORGOT_CONFIRMATION,
    payload: data
});

/**
 * Redux Action To Forgot Confirmation Success
 */
export const forgotConfirmationSuccess = (data) => ({
    type: FORGOT_CONFIRMATION_SUCCESS,
    payload: data
});

/**
 * Redux Action To Forgot Confirmation Failure
 */
export const forgotConfirmationFailure = (error) => ({
    type: FORGOT_CONFIRMATION_FAILURE,
    payload: error
});