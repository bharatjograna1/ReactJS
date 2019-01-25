import { all, call, fork, take, put, takeEvery } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import AppConfig from "Constants/AppConfig";
import { swaggerPostAPI, swaggerGetAPI, redirectToLogin, loginErrCode, staticResponse, statusErrCodeList } from 'Helpers/helpers';
const lgnErrCode = loginErrCode();
const statusErrCode = statusErrCodeList();
// import types for dispatch puropse
import { GET_OUTGOINGTRANSACTION_REPORT } from "Actions/types";

// import functions from action
import {
    getOutGoingTransactionReportSuccess,
    getOutGoingTransactionReportFailure
} from "Actions/OutGoingTransaction";

const socketApiUrl = AppConfig.socketAPIUrl;

// fetch IncomingTransactions data from API
function* getOutGoingTransactionReportSocket(payload) {
    var headers = { 'Authorization': AppConfig.authorizationToken }
    const responseFromSocket = yield call(swaggerGetAPI, 'api/Wallet/GetOutGoingTransaction', payload, headers);
    try {
        if (lgnErrCode.includes(responseFromSocket.statusCode)) {
            //unauthorized or invalid token
            redirectToLogin()
        } else {
            if (responseFromSocket.BizResponseObj.ReturnCode === 0)
                yield put(getOutGoingTransactionReportSuccess(responseFromSocket.OutGoingTransactions));
            else
                yield put(getOutGoingTransactionReportFailure(responseFromSocket.BizResponseObj.ReturnMsg));
        }
    } catch (error) {
        yield put(getOutGoingTransactionReportFailure(error));
    }
}
// dispatch action for get IncomingTransactions
function* getOutGoingTransactionReport() {
    yield takeEvery(
        GET_OUTGOINGTRANSACTION_REPORT,
        getOutGoingTransactionReportSocket
    );
}

// used for run multiple effect in parellel
export default function* rootSaga() {
    yield all([fork(getOutGoingTransactionReport)]);
}
