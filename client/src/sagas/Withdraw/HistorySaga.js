/* 
    Developer : Nishant Vadgama
    Date : 13-09-2018
    FIle Comment : Withdraw history action method's saga implementation
*/
import { all, call, fork, take, put, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import AppConfig from 'Constants/AppConfig';
const socketApiUrl = AppConfig.socketAPIUrl;
import api from 'Api';
import { swaggerPostAPI, swaggerGetAPI, redirectToLogin, loginErrCode, staticResponse, statusErrCodeList } from 'Helpers/helpers';
const lgnErrCode = loginErrCode();
const statusErrCode = statusErrCodeList();

// import types for dispatch puropse
import {
    GET_WITHDRAW_HISTORY
} from 'Actions/types';

// import functions from action
import {
    getWithdrawalHistorySuccess,
    getWithdrawalHistoryFailure
} from 'Actions/Withdraw';


function* getWithdrawHistoryData(payload) {
    var url = '';
    var payload = payload.request;
    var headers = { 'Authorization': AppConfig.authorizationToken }
    if (payload.Coin == undefined)
        url = 'api/Wallet/WithdrawalHistoy/' + payload.FromDate + '/' + payload.ToDate;
    else
        url = 'api/Wallet/WithdrawalHistoy/' + payload.FromDate + '/' + payload.ToDate + '?Coin=' + payload.Coin;
    const responseFromSocket = yield call(swaggerGetAPI, url, payload, headers);
    try {
        // check response code
        if (lgnErrCode.includes(responseFromSocket.statusCode)) {
            //unauthorized or invalid token
            redirectToLogin()
        } else {
            if (responseFromSocket.ReturnCode == 0)
                yield put(getWithdrawalHistorySuccess(responseFromSocket.Histories));
            else
                yield put(getWithdrawalHistoryFailure(responseFromSocket.ReturnMsg));
        }
    } catch (error) {
        console.log(error);
        yield put(getWithdrawalHistoryFailure(error));
    }

}

// dispatch action for get WithdrawHistory
function* getWithdrawalHistory() {
    yield takeEvery(GET_WITHDRAW_HISTORY, getWithdrawHistoryData)
}

// used for run multiple effect in parellel
export default function* rootSaga() {
    yield all([
        fork(getWithdrawalHistory)
    ]);
}