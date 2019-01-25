import { all, call, fork, take, put, takeEvery } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import AppConfig from "Constants/AppConfig";
// import types for dispatch puropse
import { GET_INCOMINGTRANSACTONS_REPORT } from "Actions/types";
import { swaggerPostAPI, swaggerGetAPI, redirectToLogin, loginErrCode, staticResponse, statusErrCodeList } from 'Helpers/helpers';
const lgnErrCode = loginErrCode();
const statusErrCode = statusErrCodeList();
// import functions from action
import {
    getIncomingTransactionsReportSuccess,
    getIncomingTransactionsReportFailure
} from "Actions/IncomingTransactions";

const socketApiUrl = AppConfig.socketAPIUrl;

// fetch IncomingTransactions data from API
const ServerRequest = (socket, request) =>
    eventChannel(emit => {
        socket.onopen = () => {
            socket.send(JSON.stringify(request)); // Send data to server
        };
        socket.onmessage = event => {
            const msg = JSON.parse(event.data);
            emit(msg);
        };
        return () => {
            socket.close();
        };
    });
function* getIncomingTransactionsReportSocket(payload) {
    var headers = { 'Authorization': AppConfig.authorizationToken }
    const responseFromSocket = yield call(swaggerGetAPI, 'api/Wallet/GetIncomingTransaction', payload, headers);
    try {
        if (lgnErrCode.includes(responseFromSocket.statusCode)) {
            //unauthorized or invalid token
            redirectToLogin()
        } else {
            if (responseFromSocket.BizResponseObj.ReturnCode === 0)
                yield put(getIncomingTransactionsReportSuccess(responseFromSocket.IncomingTransactions));
            else
                yield put(getIncomingTransactionsReportFailure(responseFromSocket.BizResponseObj.ReturnMsg));
        }
    } catch (error) {
        yield put(getIncomingTransactionsReportFailure(error));
    }
}
// dispatch action for get IncomingTransactions
function* getIncomingTransactionsReport() {
    yield takeEvery(
        GET_INCOMINGTRANSACTONS_REPORT,
        getIncomingTransactionsReportSocket
    );
}

// used for run multiple effect in parellel
export default function* rootSaga() {
    yield all([fork(getIncomingTransactionsReport)]);
}
