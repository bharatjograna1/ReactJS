/**
 * Auther : Salim Deraiya
 * Created : 14/09/2018
 * Personal Verification Actions
 */

 //Import action types form type.js
 import {
    PERSONAL_VERIFICATION,
    PERSONAL_VERIFICATION_SUCCESS,
    PERSONAL_VERIFICATION_FAILURE
} from '../types';


/**
 * Redux Action To Personal Verification
 */
export const personalVerification = (data) => ({
    type: PERSONAL_VERIFICATION,
    payload: data
});

/**
 * Redux Action Personal Verification Success
 */
export const personalVerificationSuccess = (data) => ({
    type: PERSONAL_VERIFICATION_SUCCESS,
    payload: data
});

/**
 * Redux Action Personal Verification Failure
 */
export const personalVerificationFailure = (error) => ({
    type: PERSONAL_VERIFICATION_FAILURE,
    payload: error
});
