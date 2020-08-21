import CommonConstants from '../Constants/CommonConstants';
import Immutable from 'immutable';

const initialState = new Immutable.Map({
	resultData: {},
	dashboardResult: {},
	historyData: {},
	error: null,
	chartDataBNX: {},
	chartDataETH: {},
	chartDataBTC: {}, 
	chartDataLTC: {}, 
	chartDataBCH: {},
	chartDataXRP: {}
});

function DashboardReducer(state = initialState, action) {
	if(action.response && action.response.error_type) {
		if(action.response.desc === "token expired") {
			window.location.href = "/timeout"
			return state;
		}
	}
		
	switch (action.type) {
		case CommonConstants.GET_DASHBOARD_SUCCESS:
			return Object.assign({}, state, {
				dashboardResult: action.response,
				error: null
			});
		case CommonConstants.GET_DASHBOARD_ERROR:
			return Object.assign({}, state, {
				dashboardResult: {},
				error: action.error
			});

		case CommonConstants.GET_CHART_DATA_SUCCESS:
			let ret = {
				error: null
			}
			ret[`chartData${action.response.type.toUpperCase()}`] = action.response.data
			return Object.assign({}, state, ret);
		case CommonConstants.GET_CHART_DATA_ERROR:
			return Object.assign({}, state, {
				resultData: {},
				error: action.error
			});	

		case CommonConstants.GET_HISTORY_LATEST_SUCCESS:
			return Object.assign({}, state, {
				resultData: action.response,
				error: null
			});
		case CommonConstants.GET_HISTORY_LATEST_ERROR:
			return Object.assign({}, state, {
				resultData: {},
				error: action.error
			});	

		case CommonConstants.GET_NEWS_LATEST_SUCCESS:
			return Object.assign({}, state, {
				newsData: action.response,
				error: null
			});
		case CommonConstants.GET_NEWS_LATEST_ERROR:
			return Object.assign({}, state, {
				newsData: {},
				error: action.error
			});				

		case CommonConstants.GET_HISTORY_ALL_SUCCESS:
			return Object.assign({}, state, {
				historyData: action.response,
				error: null
			});
		case CommonConstants.GET_HISTORY_ALL_ERROR:
			return Object.assign({}, state, {
				historyData: {},
				error: action.error
			});						

		case CommonConstants.DELETE_HISTORY_SUCCESS:
			return Object.assign({}, state, {
				resultData: action.response,
				error: null
			});
		case CommonConstants.DELETE_HISTORY_ERROR:
			return Object.assign({}, state, {
				resultData: {},
				error: action.error
			});	

		default:
			return state;
	}
}

export default DashboardReducer;
