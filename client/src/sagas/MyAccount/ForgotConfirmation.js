/**
 * Auther : Kevin Ladani
 * Created : 27/10/2018
 * Forgot Confirmation Sagas
 */

//Sagas Effects..
import { all, call, take, fork, put, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

//Action Types..
import { 
    FORGOT_CONFIRMATION
} from 'Actions/types';


//Action methods..
import {
    forgotConfirmationSuccess,
    forgotConfirmationFailure
} from 'Actions/MyAccount';

import AppConfig from 'Constants/AppConfig';
import { swaggerPostAPI, swaggerGetAPI } from 'Helpers/helpers';


//Function for Forgot Confirmation
function* forgotConfirmationAPI({payload}) {
    console.log('testing',payload);
    const response = yield call(swaggerGetAPI,'api/Signin/resetpassword?emailConfirmCode='+payload.emailConfirmCode,payload); 
    
    try {
        //console.log('Reset Response ',response);
        if(response.statusCode === 200) {                
            yield put(forgotConfirmationSuccess(response));
        } else {
            yield put(forgotConfirmationFailure(response));
        }
    } catch (error) {
        yield put(forgotConfirmationFailure(error));
    }
}

/* Create Sagas method for Normal Login */
export function* forgotConfirmationSagas() {
    yield takeEvery(FORGOT_CONFIRMATION, forgotConfirmationAPI);
}

/* Export methods to rootSagas */
export default function* rootSaga() {
    yield all([
        fork(forgotConfirmationSagas)
    ]);
}