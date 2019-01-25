import { put, takeEvery, all, fork, call } from 'redux-saga/effects';
import axios from 'axios';

import { GET_DATA, ADD_DATA, DELETE_DATA } from "Actions/types"
import { receiveData, addDataSuccess, deleteDataSuccess } from "Actions/tableaction";


// constant of swagger api
const swaggerPostAPI = async (methodName, request) => {
    var responseData = await axios
        .post(
            "https://cleandevtest.azurewebsites.net/SSOAccountStaging/" + methodName, request
        )
        .then(response => JSON.parse(JSON.stringify(response)))
        .catch(error => JSON.parse(JSON.stringify(error.response)));
    var response = {};
    response = responseData;
    return response;
};


// functions to show the data
export function* fetchData() {
    var response = yield fetch('https://cleandevtest.azurewebsites.net/SSOAccountStaging/api/WalletControlPanel/ListStakingPolicyMaster').then(response => response.json());
    yield put(receiveData(response.Data));
}
export function* actionWatch() {
    yield takeEvery(GET_DATA, fetchData);
}

// function to add the data in table 
export function* sendData(data) {
    var request = yield call(swaggerPostAPI, '/api/WalletControlPanel/InsertUpdateStakingPolicy', data);
    yield put(addDataSuccess(request))
}
export function* addDataApi() {
    yield takeEvery(ADD_DATA, sendData);
}


// function to delete the data of data
export function* deleteDataperm() {
    var request = yield call(swaggerPostAPI, 'api/WalletControlPanel/ChangeStakingMasterStatus/{PolicyMasterId}/{Status}', data);
    yield put(deleteDataSuccess(request))
}
export function* deleteDataApi() {
    yield takeEvery(DELETE_DATA, deleteDataperm);
}


// root saga function 
export default function* rootSaga() {
    yield all([
        fork(actionWatch),
        fork(addDataApi),
        fork(deleteDataApi),
    ]);
}
