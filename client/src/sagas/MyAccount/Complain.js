/**
 * Auther : Salim Deraiya
 * Created : 03/10/2018
 * Complain Sagas
 */

//Sagas Effects..
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

//Action Types..
import {
    LIST_COMPLAIN,
    ADD_COMPLAIN,
    GET_COMPLAIN_BY_ID,
    REPLAY_COMPLAIN,
    GET_COMPLAIN_TYPE,
} from 'Actions/types';

//Action methods..
import {
    complainListSuccess,
    complainListFailure,
    addComplainSuccess,
    addComplainFailure,
    getComplainByIdSuccess,
    getComplainByIdFailure,
    replayComplainSuccess,
    replayComplainFailure,
    getComplainTypeSuccess,
    getComplainTypeFailure,
} from 'Actions/MyAccount';

import AppConfig from 'Constants/AppConfig';
//Get function form helper for Swagger API Call
import { swaggerPostAPI, swaggerGetAPI } from 'Helpers/helpers';

//Function for Complain List API
function* getComplainListAPI() {
    var headers = { 'Authorization': AppConfig.authorizationToken }
    const response = yield call(swaggerGetAPI, '/api/Complaint/GetUserWiseComplain', {}, headers);
    try {
        if (response.ReturnCode === 0) {
            yield put(complainListSuccess(response));
        } else {
            yield put(complainListFailure(response));
        }
    } catch (error) {
        yield put(complainListFailure(error));
    }
}

//Function for Add Complain API
function* addComplainAPI({ payload }) {
    var headers = { 'Authorization': AppConfig.authorizationToken }
    const response = yield call(swaggerPostAPI, '/api/Complaint/Raisecomplaint', payload, headers);
    try {
        if (response.ReturnCode === 0) {
            yield put(addComplainSuccess(response));
        } else {
            yield put(addComplainFailure(response));
        }
    } catch (error) {
        yield put(addComplainFailure(error));
    }
}

//Function for Get Complain By Id API
function* getComplainByIdAPI({ payload }) {
    var headers = { 'Authorization': AppConfig.authorizationToken }
    const response = yield call(swaggerGetAPI, '/api/Complaint/GetComplain?ComplainId=' + payload, {}, headers);
    try {
        if (response.ReturnCode === 0) {
            yield put(getComplainByIdSuccess(response));
        } else {
            yield put(getComplainByIdFailure(response));
        }
    } catch (error) {
        yield put(complainListFailure(error));
    }
}

//Function for Replay Complain API
function* replayComplainAPI({ payload }) {
    var headers = { 'Authorization': AppConfig.authorizationToken }
    const response = yield call(swaggerPostAPI, '/api/Complaint/AddCompainTrail', payload, headers);
    try {
        if (response.ReturnCode === 0) {
            yield put(replayComplainSuccess(response));
        } else {
            yield put(replayComplainFailure(response));
        }
    } catch (error) {
        yield put(replayComplainFailure(error));
    }
}

//Function for Get Complain Type API
function* getComplainTypeAPI() {
    var headers = { 'Authorization': AppConfig.authorizationToken }
    const response = yield call(swaggerGetAPI, '/api/Complaint/GetTypeMaster?Type=complain', {}, headers);
    try {
        if (response.ReturnCode === 0) {
            yield put(getComplainTypeSuccess(response));
        } else {
            yield put(getComplainTypeFailure(response));
        }
    } catch (error) {
        yield put(getComplainTypeFailure(error));
    }
}

/* Create Sagas method for Complain List */
export function* complainListSagas() {
    yield takeEvery(LIST_COMPLAIN, getComplainListAPI);
}

/* Create Sagas method for Add Complain */
export function* addComplainSagas() {
    yield takeEvery(ADD_COMPLAIN, addComplainAPI);
}

/* Create Sagas method for get Complain By Id */
export function* getComplainByIdSagas() {
    yield takeEvery(GET_COMPLAIN_BY_ID, getComplainByIdAPI);
}

/* Create Sagas method for Replay Complain */
export function* replayComplainSagas() {
    yield takeEvery(REPLAY_COMPLAIN, replayComplainAPI);
}

/* Create Sagas method for get Complain Type */
export function* getComplainTypeSagas() {
    yield takeEvery(GET_COMPLAIN_TYPE, getComplainTypeAPI);
}

/* Export methods to rootSagas */
export default function* rootSaga() {
    yield all([
        fork(complainListSagas),
        fork(addComplainSagas),
        fork(getComplainByIdSagas),
        fork(replayComplainSagas),
        fork(getComplainTypeSagas),
    ]);
}
