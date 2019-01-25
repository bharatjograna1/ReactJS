/**
 * Auther : Salim Deraiya
 * Created : 14/09/2018
 * IP History List Sagas
 */

//Sagas Effects..
import { all, call, take, fork, put, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { IP_HISTORY_LIST } from 'Actions/types';

import {
    ipHistoryListSuccess,
    ipHistoryListFailure
} from 'Actions/MyAccount';

import AppConfig from 'Constants/AppConfig';
import { swaggerPostAPI, swaggerGetAPI, redirectToLogin, loginErrCode, staticResponse, statusErrCodeList } from 'Helpers/helpers';
const lgnErrCode = loginErrCode();
const statusErrCode = statusErrCodeList();


//Function for IP History List API
function* ipHistoryListAPI({ payload }) {
    var swaggerUrl = 'api/Manage/GetIpHistory/'+payload.PageIndex+'/'+payload.Page_Size;
    var headers =  {'Authorization': AppConfig.authorizationToken}
    const response = yield call(swaggerGetAPI,swaggerUrl,{},headers);
    
    try {
        if(lgnErrCode.includes(response.statusCode)){
            redirectToLogin();
        } else if(statusErrCode.includes(response.statusCode)){               
            staticRes = staticResponse(response.statusCode);
            yield put(ipHistoryListFailure(staticRes));
        } else if (response.statusCode === 200) {
            yield put(ipHistoryListSuccess(response));
        } else {
            yield put(ipHistoryListFailure(response));
        }
    } catch (error) {
        yield put(ipHistoryListFailure(error));
    }
}

export function* getIPHistory() {
    yield takeEvery(IP_HISTORY_LIST, ipHistoryListAPI);
}

export default function* rootSaga() {
    yield all([
        fork(getIPHistory)
    ]);
}