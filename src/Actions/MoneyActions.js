import CommonConstants from '../Constants/CommonConstants';
import ApiPathConstants from '../Constants/ApiPathConstants';

let MoneyActions = {
	payoutError: function(error) {
		return {
			error,
			type: CommonConstants.PAYOUT_ERROR
		};
	},

	payoutSuccess: function(response) {
		return {
			response,
			type: CommonConstants.PAYOUT_SUCCESS
		};
	},

	payout: function(data, cb){
		let _obj = this;
		return dispatch => {
			fetch(ApiPathConstants.getApiPath() + 'money/payout/' + data.amount + "/", {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('access_token')}`
				}
			})
			.then(response => {
				if(response.ok){
					response.json().then(function(res) {
						dispatch(_obj.payoutSuccess(res));
						if(cb != null){
							cb(res);
						}
	        		});
	        	}else{
					let _error={
						status: response.status,
						error: response.statusText
					};
					dispatch(_obj.payoutError(_error));
					if(cb != null){
						cb(_error);
					}
	        	}
			})
			.catch(error => {
				dispatch(_obj.payoutError(error));
				if(cb != null){
					cb(error);
				}
			});
		};
	},

	quickPaymentError: function(error) {
		return {
			error,
			type: CommonConstants.QUICK_PAYMENT_ERROR
		};
	},

	quickPaymentSuccess: function(response) {
		return {
			response,
			type: CommonConstants.QUICK_PAYMENT_SUCCESS
		};
	},

	quickPayment: function(data, cb){
		let _obj = this;
		return dispatch => {
			fetch(`${ApiPathConstants.getApiPath()}quickpay/gateway/${data.type}/${data.amount}.0/`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('access_token')}`
				}
			})
			.then(response => {
				if(response.ok){
					response.text().then(function(res) {
						dispatch(_obj.quickPaymentSuccess(res));
						if(cb != null){
							cb(res);
						}
	        		});
	        	}else{
					let _error={
						status: response.status,
						error: response.statusText
					};
					dispatch(_obj.quickPaymentError(_error));
					if(cb != null){
						cb(_error);
					}
	        	}
			})
			.catch(error => {
				dispatch(_obj.quickPaymentError(error));
				if(cb != null){
					cb(error);
				}
			});
		};
	},

    getDecimal: function(val) {
        return (parseInt(val, 10) === parseFloat(val)) ? parseFloat(val).toFixed(2) : val
    },

	buyMoneyError: function(error) {
		return {
			error,
			type: CommonConstants.BUY_MONEY_ERROR
		};
	},

	buyMoneySuccess: function(response) {
		return {
			response,
			type: CommonConstants.BUY_MONEY_SUCCESS
		};
	},

	buyMoney: function(data, cb){
		let _obj = this;
		let endpoint = '';
		let fromValue = this.getDecimal(data.from);

		if (data.coinType === "BNX") {
			endpoint = `money/${(data.type === "BUY") ? 'bnx_to_coin' : 'coin_to_bnx'}/${data.bnxType.toLowerCase()}/${fromValue}/`
		}else {
			endpoint = `money/${(data.type === "BUY") ? 'eur_to_coin' : 'coin_to_eur'}/${data.coinType.toLowerCase()}/${fromValue}/`
		}
		console.log(endpoint);

		return dispatch => {
			fetch(ApiPathConstants.getApiPath() + endpoint, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('access_token')}`
				}
			})
			.then(response => {
				if(response.ok){
					response.json().then(function(res) {
						dispatch(_obj.buyMoneySuccess(res));
						if(cb != null){
							cb(res);
						}
	        		});
	        	}else{
					let _error={
						status: response.status,
						error: response.statusText
					};
					dispatch(_obj.buyMoneyError(_error));
					if(cb != null){
						cb(_error);
					}
	        	}
			})
			.catch(error => {
				dispatch(_obj.buyMoneyError(error));
				if(cb != null){
					cb(error);
				}
			});
		};
	},

	getOrderBookError: function(error) {
		return {
			error,
			type: CommonConstants.GET_ORDER_BOOK_ERROR
		};
	},

	getOrderBookSuccess: function(response) {
		return {
			response,
			type: CommonConstants.GET_ORDER_BOOK_SUCCESS
		};
	},

	getOrderBook: function(data, cb){
		let _obj = this;
		return dispatch => {
			fetch(`${ApiPathConstants.getApiPath()}bitstamp/order_book/${data.type.toLowerCase()}/`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('access_token')}`
				}
			})
			.then(response => {
				if(response.ok){
					response.json().then(function(res) {
						dispatch(_obj.getOrderBookSuccess({
							type: data.type,
							data: {
								buyers: res.bids.slice(0, 7),
								sellers: res.asks.slice(0, 7)
							}
						}));
						if(cb != null){
							cb(res);
						}
	        		});
	        	}else{
					let _error={
						status: response.status,
						error: response.statusText
					};
					dispatch(_obj.getOrderBookError(_error));
					if(cb != null){
						cb(_error);
					}
	        	}
			})
			.catch(error => {
				dispatch(_obj.getOrderBookError(error));
				if(cb != null){
					cb(error);
				}
			});
		};
	},

	moneyProcessError: function(error) {
		return {
			error,
			type: CommonConstants.MONEY_PROCESS_ERROR
		};
	},

	moneyProcessSuccess: function(response) {
		return {
			response,
			type: CommonConstants.MONEY_PROCESS_SUCCESS
		};
	},

	moneyProcess: function(cb){
		let _obj = this
		return dispatch => {
			fetch(ApiPathConstants.getApiPath() + 'money/profile_process/', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('access_token')}`
				}
			})
			.then(response => {
				if(response.ok){
					response.json().then(function(res) {
						dispatch(_obj.moneyProcessSuccess(res));
						if(cb != null){
							cb(res);
						}
	        		});
	        	}else{
					let _error={
						status: response.status,
						error: response.statusText
					};
					dispatch(_obj.moneyProcessError(_error));
					if(cb != null){
						cb(_error);
					}
	        	}
			})
			.catch(error => {
				dispatch(_obj.moneyProcessError(error));
				if(cb != null){
					cb(error);
				}
			});
		};
	},
};

export default MoneyActions;
