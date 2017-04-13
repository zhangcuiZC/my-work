import {
	VALIDATEPHONE_REQUEST_START,
	VALIDATEPHONE_REQUEST_ERROR,
	VALIDATEPHONE_REQUEST_RECEIVE,
	VALIDATECODE_REQUEST_START,
	VALIDATECODE_REQUEST_ERROR,
	VALIDATECODE_REQUEST_RECEIVE
} from '../actions/validatePhoneNum';

import { combineReducers } from 'redux';

const validatePhone = (state={}, action) => {
	switch(action.type) {
		case VALIDATEPHONE_REQUEST_START:
			return {
				...action
			}
		case VALIDATEPHONE_REQUEST_ERROR:
			return {
				...action
			}
		case VALIDATEPHONE_REQUEST_RECEIVE:
			return {
				...action
			}
		default:
			return state;
	}
}

const validateCode = (state={}, action) => {
	switch(action.type) {
		case VALIDATECODE_REQUEST_START:
			return{
				...action
			}
		case VALIDATECODE_REQUEST_ERROR:
			return {
				...action
			}
		case VALIDATECODE_REQUEST_RECEIVE:
			return {
				...action
			}
		default:
			return state;
	}
}

export default combineReducers({validatePhone,validateCode});