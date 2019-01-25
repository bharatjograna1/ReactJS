/* 
    Developer : Nishant Vadgama
    Date : 14-09-2018
    FIle Comment : Address generation action method's saga implementation
*/
import { all, call, fork, take, put, takeEvery } from 'redux-saga/effects';
import api from 'Api';
import { eventChannel } from 'redux-saga';
import AppConfig from 'Constants/AppConfig';
import { swaggerPostAPI, swaggerGetAPI, redirectToLogin, loginErrCode, staticResponse, statusErrCodeList } from 'Helpers/helpers';
const lgnErrCode = loginErrCode();
const statusErrCode = statusErrCodeList();
import React from 'react';
import IntlMessages from 'Util/IntlMessages';
const socketApiUrl = AppConfig.socketAPIUrl;
import { NotificationManager } from 'react-notifications';
// import types for dispatch puropse
import {
    GET_AD_CURRENCY,
    GET_AD_WALLETS,
    GET_AD_BALANCE,
    GET_DEFAULT_ADD,
    GENERATE_ADDRESS
} from 'Actions/types';

// import functions from action
import {
    getCurrencySuccess,
    getCurrencyFailure,
    getWalletsSuccess,
    getWalletsFailure,
    getBalanceSuccess,
    getBalanceFailure,
    getDefaultAddressSuccess,
    getDefaultAddressFailure,
    generateNewAddressSuccess,
    generateNewAddressFailure
} from 'Actions/Deposit';

/* GET CURRENCY LIST */
function* getCurrencySocket(payload) {
    var headers = { 'Authorization': AppConfig.authorizationToken }
    const responseFromSocket = yield call(swaggerGetAPI, 'api/TransactionConfiguration/GetAllServiceConfiguration', payload, headers);
    try {
        // check response code
        if (lgnErrCode.includes(responseFromSocket.statusCode)) {
            //unauthorized or invalid token
            redirectToLogin()
        } else {
            if (responseFromSocket.statusCode == 200 && responseFromSocket.ReturnCode == 0) // success
                yield put(getCurrencySuccess(responseFromSocket.Response));
            else if (responseFromSocket.statusCode == 200 && responseFromSocket.ReturnCode == 1) // failure
                yield put(getCurrencySuccess({}));
            else if (responseFromSocket.statusCode != 200) // other then 200 statuscode
                yield put(getCurrencySuccess({}));
        }
    } catch (error) {
        console.log(error);
        yield put(getCurrencyFailure(error));
    }
}
function* getCurrency() {
    yield takeEvery(GET_AD_CURRENCY, getCurrencySocket);
}

/* GET WALLETS */
function* getWalletsSocket(payload) {
    var headers = { 'Authorization': AppConfig.authorizationToken }
    const responseFromSocket = yield call(swaggerGetAPI, 'api/Wallet/GetWalletByType/' + payload.request.Coin, payload, headers);
    try {
        //console.log("GetWalletByType", responseFromSocket);
        // check response code
        if (lgnErrCode.includes(responseFromSocket.statusCode)) {
            //unauthorized or invalid token
            redirectToLogin()
        } else {
            if (responseFromSocket.ReturnCode == 0 && responseFromSocket.statusCode == 200) {
                yield put(getWalletsSuccess(responseFromSocket.Wallets));
            } else if (responseFromSocket.ReturnCode == 1) {
                NotificationManager.error(<IntlMessages id={`apiWalletErrCode.${responseFromSocket.ErrorCode}`} />);
                yield put(getWalletsFailure(responseFromSocket.ErrorCode));
            }
        }
    } catch (error) {
        console.log(error);
        yield put(getWalletsFailure(error));
    }
}
function* getWallets() {
    yield takeEvery(GET_AD_WALLETS, getWalletsSocket)
}

/* GET WALLET BALANCE BY WALLET ID */
function* getBalanceSocket(payload) {
    var headers = { 'Authorization': AppConfig.authorizationToken }
    const responseFromSocket = yield call(swaggerGetAPI, 'api/Wallet/GetAllBalances/' + payload.walletId, payload, headers);
    try {
        if (lgnErrCode.includes(responseFromSocket.statusCode)) {
            //unauthorized or invalid token
            redirectToLogin()
        } else if (responseFromSocket.hasOwnProperty('BizResponseObj')) {
            if (responseFromSocket.BizResponseObj.ReturnCode == 0) // success
                yield put(getBalanceSuccess(responseFromSocket.Balance));
            else {//fail
                NotificationManager.error(<IntlMessages id={`apiWalletErrCode.${responseFromSocket.BizResponseObj.ErrorCode}`} />);
                yield put(getBalanceFailure(responseFromSocket.BizResponseObj.ErrorCode));
            }
        } else {
            NotificationManager.error(<IntlMessages id={`apiWalletErrCode.${responseFromSocket.ErrorCode}`} />);
            yield put(getBalanceFailure(responseFromSocket.ErrorCode));
        }
    } catch (error) {
        console.log(error);
        yield put(getBalanceFailure(error));
    }
}
function* getBalance() {
    yield takeEvery(GET_AD_BALANCE, getBalanceSocket)
}

/* GET DEFAULT ADDRESS BY WALLET ID */
function* getDefaultAddressSocket(payload) {
    var headers = { 'Authorization': AppConfig.authorizationToken }
    const responseFromSocket = yield call(swaggerGetAPI, 'api/WalletOperations/GetDefaultWalletAddress/' + payload.walletId, payload, headers);
    try {
        if (lgnErrCode.includes(responseFromSocket.statusCode)) {
            //unauthorized or invalid token
            redirectToLogin()
        } else {
            if (responseFromSocket.ReturnCode == 0) // success
                yield put(getDefaultAddressSuccess(responseFromSocket.AddressList));
            else //fail
                yield put(getDefaultAddressFailure(responseFromSocket.ReturnMsg));
        }
    } catch (error) {
        console.log(error);
        yield put(getDefaultAddressFailure(error));
    }
}
function* getDefaultAddress() {
    yield takeEvery(GET_DEFAULT_ADD, getDefaultAddressSocket)
}

/* GENERATE ADDRESS */
function* generateNewAddressSocket(payload) {
    var payload = payload.request;
    var headers = { 'Authorization': AppConfig.authorizationToken }
    const responseFromSocket = yield call(swaggerPostAPI, 'api/WalletOperations/CreateWalletAddress/' + payload.Coin + '/' + payload.AccWalletID, payload, headers);
    try {
        // check response code
        if (lgnErrCode.includes(responseFromSocket.statusCode)) {
            //unauthorized or invalid token
            redirectToLogin()
        } else {
            yield put(generateNewAddressSuccess(responseFromSocket));
        }
    } catch (error) {
        console.log(error);
        yield put(generateNewAddressFailure(error));
    }
}
function* generateNewAddress() {
    yield takeEvery(GENERATE_ADDRESS, generateNewAddressSocket);
}

export default function* rootSaga() {
    yield all([
        fork(getCurrency),
        fork(getWallets),
        fork(getBalance),
        fork(getDefaultAddress),
        fork(generateNewAddress)
    ]);
}