import CommonConstants from '../Constants/CommonConstants';
import Immutable from 'immutable';

const initialState = new Immutable.Map({
	resultData: {},
	profileData: {},
	logsData: {},
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
		case CommonConstants.GET_PROFILE_INFO_SUCCESS:
			return Object.assign({}, state, {
				profileData: action.response,
				error: null
			});
		case CommonConstants.GET_PROFILE_INFO_ERROR:
			return Object.assign({}, state, {
				profileData: {},
				error: action.error
			});

		case CommonConstants.GET_PROFILE_LOGS_SUCCESS:
			return Object.assign({}, state, {
				logsData: action.response,
				error: null
			});
		case CommonConstants.GET_PROFILE_LOGS_ERROR:
			return Object.assign({}, state, {
				logsData: {},
				error: action.error
			});	

		case CommonConstants.ADD_PROFILE_LOG_SUCCESS:
			return Object.assign({}, state, {
				resultData: action.response,
				error: null
			});
		case CommonConstants.ADD_PROFILE_LOG_ERROR:
			return Object.assign({}, state, {
				resultData: {},
				error: action.error
			});				

		case CommonConstants.UPDATE_PROFILE_SUCCESS:
			return Object.assign({}, state, {
				resultData: action.response,
				error: null
			});
		case CommonConstants.UPDATE_PROFILE_ERROR:
			return Object.assign({}, state, {
				resultData: {},
				error: action.error
			});									
			
		default:
			return state;
	}
}

export default CommonReducer;
