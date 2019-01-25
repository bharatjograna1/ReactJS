/**
 * Auther : Salim Deraiya
 * Created : 14/09/2018
 * Activity List Sagas
 */

//Sagas Effects..
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

//Action Types..
import {
    ACTIVITY_LIST
} from 'Actions/types';

//Action methods..
import {
    activityListSuccess,
    activityListFailure
} from 'Actions/MyAccount';

import AppConfig from 'Constants/AppConfig';
//Get function form helper for Swagger API Call
import { swaggerPostAPI, swaggerGetAPI } from 'Helpers/helpers';

//Function for Activity List
function* activityListAPI({ payload }) {
    var headers = { 'Authorization': AppConfig.authorizationToken }
    var swaggerUrl = 'api/Manage/GetUserActivityLog/' + payload.PageIndex + '/' + payload.Page_Size + '/' + payload.FromDate + '/' + payload.ToDate;

    const response = yield call(swaggerGetAPI, swaggerUrl, {}, headers);
    try {
        if (response.ReturnCode === 0) {
            yield put(activityListSuccess(response));
        } else {
            yield put(activityListFailure(response));
        }
    } catch (error) {
        yield put(activityListFailure(error));
    }
}

/* Create Sagas method for activityList */
export function* activityListSagas() {
    yield takeEvery(ACTIVITY_LIST, activityListAPI);
}

/* Export methods to rootSagas */
export default function* rootSaga() {
    yield all([
        fork(activityListSagas)
    ]);
}
