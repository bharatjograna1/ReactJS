/**
 * Auther : Kevin Ladani
 * Created : 19/12/2018
 * UpdatedBy : Salim Deraiya 24/12/2018
 * Social Profile Sagas
 */

//Sagas Effects..
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

//Action Types..
import {
    GET_LEADER_CONFIG,
    EDIT_LEADER_CONFIG,
    GET_FOLLOWER_CONFIG,
    EDIT_FOLLOWER_CONFIG,
    GET_SOCIAL_PROFILE_SUBSCRIPTION,
    SOCIAL_PROFILE_SUBSCRIBE,
    SOCIAL_PROFILE_UNSUBSCRIBE
} from 'Actions/types';

//Action methods..
import {
    getLeaderConfigSuccess,
    getLeaderConfigFailure,
    editLeaderConfigSuccess,
    editLeaderConfigFailure,
    getFollowerConfigSuccess,
    getFollowerConfigFailure,
    editFollowerConfigSuccess,
    editFollowerConfigFailure,
    getSocialProfileSubscriptionSuccess,
    getSocialProfileSubscriptionFailure,
    getSocialProfileSubscribeSuccess,
    getSocialProfileSubscribeFailure,
    getSocialProfileUnSubscribeSuccess,
    getSocialProfileUnSubscribeFailure,
} from 'Actions/SocialProfile';

import AppConfig from 'Constants/AppConfig';
import { swaggerGetAPI, swaggerPostAPI } from 'Helpers/helpers';

//Function for Get Leader Configuration API
function* getLeaderConfigAPI({ payload }) {
    var headers = { 'Authorization': AppConfig.authorizationToken }
    const response = yield call(swaggerPostAPI, 'api/SocialProfile/SetLeaderFrontProfile', payload, headers);
    
	try {
		if (response.ReturnCode === 0) {
			yield put(getLeaderConfigSuccess(response));
		} else {
			yield put(getLeaderConfigFailure(response));
		}
	} catch (error) {
		yield put(getLeaderConfigFailure(error));
	}
}

//Function for Edit Leader Configuration API
function* editLeaderConfigAPI({ payload }) {
    var headers = { 'Authorization': AppConfig.authorizationToken }
    const response = yield call(swaggerPostAPI, 'api/SocialProfile/SetLeaderFrontProfile', payload, headers);
    
	try {
		if (response.ReturnCode === 0) {
			yield put(editLeaderConfigSuccess(response));
		} else {
			yield put(editLeaderConfigFailure(response));
		}
	} catch (error) {
		yield put(editLeaderConfigFailure(error));
	}
}

//Function for Get Follower Configuration API
function* getFollowerConfigAPI({ payload }) {
    var headers = { 'Authorization': AppConfig.authorizationToken }
    const response = yield call(swaggerPostAPI, 'api/SocialProfile/SetFollowerFrontProfile', payload, headers);
    
	try {
		if (response.ReturnCode === 0) {
			yield put(getFollowerConfigSuccess(response));
		} else {
			yield put(getFollowerConfigFailure(response));
		}
	} catch (error) {
		yield put(getFollowerConfigFailure(error));
	}
}

//Function for Edit Follower Configuration API
function* editFollowerConfigAPI({ payload }) {
    var headers = { 'Authorization': AppConfig.authorizationToken }
    const response = yield call(swaggerPostAPI, 'api/SocialProfile/SetFollowerFrontProfile', payload, headers);
    
	try {
		if (response.ReturnCode === 0) {
			yield put(editFollowerConfigSuccess(response));
		} else {
			yield put(editFollowerConfigFailure(response));
		}
	} catch (error) {
		yield put(editFollowerConfigFailure(error));
	}
}

//Function for Get Social Profile Subscription API
function* getSocialProfileSubscriptionAPI() {
    var headers = { 'Authorization': AppConfig.authorizationToken }
    const response = yield call(swaggerGetAPI, 'api/SocialProfile/GetSocialProfile', {}, headers);
    
	try {
		if (response.ReturnCode === 0) {
			yield put(getSocialProfileSubscriptionSuccess(response));
		} else {
			yield put(getSocialProfileSubscriptionFailure(response));
		}
	} catch (error) {
		yield put(getSocialProfileSubscriptionFailure(error));
	}
}

//Function for Get Social Profile Subscription API
function* getSocialProfileSubscriptionAPI() {
    var headers = { 'Authorization': AppConfig.authorizationToken }
    const response = yield call(swaggerGetAPI, 'api/SocialProfile/GetSocialProfile', {}, headers);
    
	try {
		if (response.ReturnCode === 0) {
			yield put(getSocialProfileSubscriptionSuccess(response));
		} else {
			yield put(getSocialProfileSubscriptionFailure(response));
		}
	} catch (error) {
		yield put(getSocialProfileSubscriptionFailure(error));
	}
}

//Function for Get Social Profile Subscribe API
function* getSocialProfileSubscribeAPI({ payload }) {
    var headers = { 'Authorization': AppConfig.authorizationToken }
    const response = yield call(swaggerPostAPI, 'api/SocialProfile/SubscribSocialProfile/'+payload, '', headers);
    
	try {
		if (response.ReturnCode === 0) {
			yield put(getSocialProfileSubscribeSuccess(response));
		} else {
			yield put(getSocialProfileSubscribeFailure(response));
		}
	} catch (error) {
		yield put(getSocialProfileSubscribeFailure(error));
	}
}

//Function for Get Social Profile UnSubscribe API
function* getSocialProfileUnSubscribeAPI({ payload }) {
    var headers = { 'Authorization': AppConfig.authorizationToken }
    const response = yield call(swaggerPostAPI, 'api/SocialProfile/UnsibscribeSocialProfile/'+payload, '', headers);
    
	try {
		if (response.ReturnCode === 0) {
			yield put(getSocialProfileUnSubscribeSuccess(response));
		} else {
			yield put(getSocialProfileUnSubscribeFailure(response));
		}
	} catch (error) {
		yield put(getSocialProfileUnSubscribeFailure(error));
	}
}


/* Create Sagas method for Get Leader Configuration */
export function* getLeaderConfigSagas() {
    yield takeEvery(GET_LEADER_CONFIG, getLeaderConfigAPI);
}

/* Create Sagas method for Get Follower Configuration */
export function* getFollowerConfigSagas() {
    yield takeEvery(GET_FOLLOWER_CONFIG, getFollowerConfigAPI);
}

/* Create Sagas method for Edit Leader Configuration */
export function* editLeaderConfigSagas() {
    yield takeEvery(EDIT_LEADER_CONFIG, editLeaderConfigAPI);
}

/* Create Sagas method for Edit Follower Configuration */
export function* editFollowerConfigSagas() {
    yield takeEvery(EDIT_FOLLOWER_CONFIG, editFollowerConfigAPI);
}

/* Create Sagas method for Get Social Profile Subscription */
export function* getSocialProfileSubscriptionSagas() {
    yield takeEvery(GET_SOCIAL_PROFILE_SUBSCRIPTION, getSocialProfileSubscriptionAPI);
}

/* Create Sagas method for Social Profile Subscribe */
export function* getSocialProfileSubscribeSagas() {
    yield takeEvery(SOCIAL_PROFILE_SUBSCRIBE, getSocialProfileSubscribeAPI);
}

/* Create Sagas method for Social Profile UnSubscribe */
export function* getSocialProfileUnSubscribeSagas() {
    yield takeEvery(SOCIAL_PROFILE_UNSUBSCRIBE, getSocialProfileUnSubscribeAPI);
}


/* Export methods to rootSagas */
export default function* rootSaga() {
    yield all([
        fork(getLeaderConfigSagas),
        fork(editLeaderConfigSagas),
        fork(getFollowerConfigSagas),
        fork(editFollowerConfigSagas),
        fork(getSocialProfileSubscriptionSagas),
        fork(getSocialProfileSubscribeSagas),
        fork(getSocialProfileUnSubscribeSagas),
    ]);
}