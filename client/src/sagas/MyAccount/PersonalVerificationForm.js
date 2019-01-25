/**
 * Auther : Salim Deraiya
 * Created : 14/09/2018
 * Personal Verification Form Sagas
 */

//Sagas Effects..
import { all, call, take, fork, put, takeEvery } from 'redux-saga/effects';
//Action Types..
import { PERSONAL_VERIFICATION } from "Actions/types";
//Action methods..
import { personalVerificationSuccess, personalVerificationFailure } from "Actions/MyAccount";
import AppConfig from 'Constants/AppConfig';
import { swaggerPostAPI, swaggerGetAPI, convertObjToFormData } from 'Helpers/helpers';


//Function for Personal Verification
function* personalVerificationAPI({ payload }) {
	var formData = convertObjToFormData(payload);
	var headers =  { 'Authorization': AppConfig.authorizationToken }
	const response = yield call(swaggerPostAPI,'api/KYC/PersonalVerification',formData,headers);
	// console.log('Response :',response);
	
	try {
		if (response.ReturnCode === 0) {
			yield put(personalVerificationSuccess(response));
		} else {
			yield put(personalVerificationFailure(response));
		}
	} catch (error) {
		yield put(personalVerificationFailure(error));
	}
}

/* Create Sagas method for personalVerification */
export function* personalVerificationSagas() {
	yield takeEvery(PERSONAL_VERIFICATION, personalVerificationAPI);
}

/* Export methods to rootSagas */
export default function* rootSaga() {
	yield all([
		fork(personalVerificationSagas)
	]);
}