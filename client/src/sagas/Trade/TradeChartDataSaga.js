// sagas For Trade Chart Data Actions By Tejas Date : 25/9/2018

// effects for redux-saga
import { all, call, fork, put, takeEvery, take } from 'redux-saga/effects';

// types for set actions and reducers
import { GET_CHART_DATA } from 'Actions/types';

// action sfor set data or response
import { getChartDataSuccess, getChartDataFailure } from 'Actions/Trade';
import { swaggerGetAPI } from 'Helpers/helpers';

// Sagas Function for get Current Market Cap data by :Tejas Date : 25/9/2018
function* getChartData() {
    yield takeEvery(GET_CHART_DATA, getChartDataDetail)
}

// Function for Open Oders
function* getChartDataDetail({payload}) {

    try {

        const response = yield call(swaggerGetAPI,'api/Transaction/GetGraphDetail/'+payload.Pair+"/"+payload.Interval,{});
        //console.log('GetGraphDetail Response',response,new Date());

        if(response.ReturnCode === 0) {
            yield put(getChartDataSuccess(response));
        } else {
            yield put(getChartDataFailure(response));
        }
        
    } catch (error) {
        yield put(getChartDataFailure(error));
    }

}

// Function for root saga 
export default function* rootSaga() {
    yield all([
        fork(getChartData),
    ]);
}