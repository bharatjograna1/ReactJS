// sagas For Current Market Cap  Actions By Tejas Date : 14/9/2018

// effects for redux-saga
import { all, call, fork, put, takeEvery, take } from 'redux-saga/effects';

// types for set actions and reducers
import { GET_MARKET_CAP_LIST } from 'Actions/types';

// action sfor set data or response
import { getMarketCapListSuccess, getMarketCapListFailure } from 'Actions/Trade';
import { swaggerGetAPI } from 'Helpers/helpers';

// Sagas Function for get Current Market Cap data by :Tejas Date : 14/9/2018
function* getMarketCapList() {
    yield takeEvery(GET_MARKET_CAP_LIST, getMarketCapListData)
}

// Function for Open Oders
function* getMarketCapListData({payload}) {
   
    try {

        const response = yield call(swaggerGetAPI,'api/Transaction/GetMarketCap/'+payload.Pair.Pair,{});
        //console.log('market data Response',response,new Date());

        if(response.ReturnCode === 0) {
            yield put(getMarketCapListSuccess(response));
        } else {
            yield put(getMarketCapListFailure(response));
        }
        
    } catch (error) {
        yield put(getMarketCapListFailure(error));
    }

}

// Function for root saga 
export default function* rootSaga() {
    yield all([
        fork(getMarketCapList),
    ]);
}