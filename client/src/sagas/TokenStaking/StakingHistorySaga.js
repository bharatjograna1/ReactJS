/* 
    Developer : Nishant Vadgama
    Date : 21-09-2018
    File comment : Token Staking saga methods list
*/
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { swaggerPostAPI, swaggerGetAPI, redirectToLogin, loginErrCode, staticResponse, statusErrCodeList } from 'Helpers/helpers';
const lgnErrCode = loginErrCode();
const statusErrCode = statusErrCodeList();
import AppConfig from 'Constants/AppConfig';
import api from 'Api';
import {
    GET_STAKHISTORY
} from 'Actions/types';
import {
    getStakHistorySuccess,
    getStakHistoryFailure
} from 'Actions/TokenStaking';


function* getStakHistoryData(payload) {
    const request = payload.request;
    var headers = { 'Authorization': AppConfig.authorizationToken }
    var URL = 'api/WalletOperations/GetStackingHistory/' + request.PageSize + "/" + request.Page + '?';
    if (request.hasOwnProperty("FromDate") && request.FromDate != "") {
        URL += '&FromDate=' + request.FromDate;
    }
    if (request.hasOwnProperty("ToDate") && request.ToDate != "") {
        URL += '&ToDate=' + request.ToDate;
    }
    if (request.hasOwnProperty("Type") && request.Type != "") {
        URL += '&Type=' + request.Type;
    }
    if (request.hasOwnProperty("Slab") && request.Slab != "") {
        URL += '&Slab=' + request.Slab;
    }
    if (request.hasOwnProperty("StakingType") && request.StakingType != "") {
        URL += '&StakingType=' + request.StakingType;
    }
    const responseFromSocket = yield call(swaggerGetAPI, URL, payload, headers);
    try {
        // check response code
        if (lgnErrCode.includes(responseFromSocket.statusCode)) {
            //unauthorized or invalid token
            redirectToLogin()
        } else {
            if (responseFromSocket.ReturnCode == 0)
                yield put(getStakHistorySuccess(responseFromSocket));
            else
                yield put(getStakHistoryFailure(responseFromSocket));
        }
    } catch (error) {
        console.log(error);
        yield put(getStakHistoryFailure(error));
    }

}

function* getStakHistory() {
    yield takeEvery(GET_STAKHISTORY, getStakHistoryData)
}

// used for run multiple effect in parellel
export default function* rootSaga() {
    yield all([
        fork(getStakHistory)
    ]);
}