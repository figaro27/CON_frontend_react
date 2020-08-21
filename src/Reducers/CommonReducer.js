import CommonConstants from '../Constants/CommonConstants';
import Immutable from 'immutable';

const initialState = new Immutable.Map({
	moneyData: {},
	resultData: {},
	error: null
});

function CommonReducer(state = initialState, action) {
	if(action.response && action.response.error_type) {
		if(action.response.desc === "token expired") {
			window.location.href = "/timeout"
			return state;
		}
	}

	switch (action.type) {
		case CommonConstants.GET_MONEY_BACKEND_SUCCESS:
			return Object.assign({}, state, {
				moneyData: action.response,
				error: null
			});
		case CommonConstants.GET_MONEY_BACKEND_ERROR:
			return Object.assign({}, state, {
				moneyData: {},
				error: action.error
			});

		case CommonConstants.SEND_EMAIL_SUCCESS:
			return Object.assign({}, state, {
				resultData: action.response,
				error: null
			});
		case CommonConstants.SEND_EMAIL_ERROR:
			return Object.assign({}, state, {
				resultData: {},
				error: action.error
			});			
			
		case CommonConstants.SEND_NOTIFICATION_EMAIL_SUCCESS:
			return Object.assign({}, state, {
				resultData: action.response,
				error: null
			});
		case CommonConstants.SEND_NOTIFICATION_EMAIL_ERROR:
			return Object.assign({}, state, {
				resultData: {},
				error: action.error
			});						
			
		default:
			return state;
	}
}

export default CommonReducer;
