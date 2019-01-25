/**
 * Auther : Salim Deraiya
 * Created : 14/09/2018
 * IP History List Sagas
 */

//Sagas Effects..
import { all, call, take, fork, put, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import {
    LOGIN_HISTORY_LIST
} from 'Actions/types';

import {
    loginHistoryListSuccess,
    loginHistoryListFailure
} from 'Actions/MyAccount';

import AppConfig from 'Constants/AppConfig';
import { swaggerPostAPI, swaggerGetAPI, redirectToLogin, loginErrCode, staticResponse, statusErrCodeList } from 'Helpers/helpers';
const lgnErrCode = loginErrCode();
const statusErrCode = statusErrCodeList();

//Function for Login History List API
function* loginHistoryListAPI({ payload }) {
    var swaggerUrl = 'api/Manage/GetLoginHistory/'+payload.PageIndex+'/'+payload.Page_Size;
    var headers =  {'Authorization': AppConfig.authorizationToken}
    const response = yield call(swaggerGetAPI,swaggerUrl,{},headers);
    
    try {
        if(lgnErrCode.includes(response.statusCode)){
            redirectToLogin();
        } else if(statusErrCode.includes(response.statusCode)){               
            staticRes = staticResponse(response.statusCode);
            yield put(loginHistoryListFailure(staticRes));
        } else if (response.statusCode === 200) {
            yield put(loginHistoryListSuccess(response));
        } else {
            yield put(loginHistoryListFailure(response));
        }
    } catch (error) {
        yield put(loginHistoryListFailure(error));
    }
}

export function* getLoginHistory() {
    yield takeEvery(LOGIN_HISTORY_LIST, loginHistoryListAPI);
}

export default function* rootSaga() {
    yield all([
        fork(getLoginHistory)
    ]);
}