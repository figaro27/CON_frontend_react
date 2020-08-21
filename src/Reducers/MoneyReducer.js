import CommonConstants from '../Constants/CommonConstants';
import Immutable from 'immutable';

const initialState = new Immutable.Map({
	resultData: {},
	bookDataETH: {},
	bookDataBTC: {}, 
	bookDataLTC: {}, 
	bookDataBCH: {},
	bookDataXRP: {},
	error: null
});

function MoneyReducer(state = initialState, action) {
	if(action.response && action.response.error_type) {
		if(action.response.desc === "token expired") {
			window.location.href = "/timeout"
			return state;
		}
	}
		
	switch (action.type) {
		case CommonConstants.PAYOUT_SUCCESS:
			return Object.assign({}, state, {
				resultData: action.response,
				error: null
			});
		case CommonConstants.PAYOUT_ERROR:
			return Object.assign({}, state, {
				resultData: {},
				error: action.error
			});	

		case CommonConstants.QUICK_PAYMENT_SUCCESS:
			return Object.assign({}, state, {
				resultData: action.response,
				error: null
			});
		case CommonConstants.QUICK_PAYMENT_ERROR:
			return Object.assign({}, state, {
				resultData: {},
				error: action.error
			});	

		case CommonConstants.BUY_MONEY_SUCCESS:
			return Object.assign({}, state, {
				resultData: action.response,
				error: null
			});
		case CommonConstants.BUY_MONEY_ERROR:
			return Object.assign({}, state, {
				resultData: {},
				error: action.error
			});

		case CommonConstants.GET_ORDER_BOOK_SUCCESS:
			let ret = {
				error: null
			}
			ret[`bookData${action.response.type}`] =  action.response.data
			return Object.assign({}, state, ret);
		case CommonConstants.GET_ORDER_BOOK_ERROR:
			return Object.assign({}, state, {
				resultData: {},
				error: action.error
			});				

		case CommonConstants.MONEY_PROCESS_SUCCESS:
			return Object.assign({}, state, {
				resultData: action.response,
				error: null
			});
		case CommonConstants.MONEY_PROCESS_ERROR:
			return Object.assign({}, state, {
				resultData: {},
				error: action.error
			});										

		default:
			return state;
	}
}

export default MoneyReducer;
