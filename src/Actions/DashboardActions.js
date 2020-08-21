import CommonConstants from '../Constants/CommonConstants';
import ApiPathConstants from '../Constants/ApiPathConstants';

let DashboardActions = {
	getDashboardError: function(error) {
		return {
			error,
			type: CommonConstants.GET_DASHBOARD_ERROR
		};
	},

	getDashboardSuccess: function(response) {
		return {
			response,
			type: CommonConstants.GET_DASHBOARD_SUCCESS
		};
	},

	getDashboard: function(cb, coin){
		let _obj = this;
		return dispatch => {
			fetch(ApiPathConstants.getApiPath() + "api/dashboardfree/?format=json")
			.then(response => {
				if(response.status === 200) {
					response.json().then(function(res) {
						dispatch(_obj.getDashboardSuccess(res));
						if(cb) {
							cb(res);
						}
	        		});
				}else {
					dispatch(_obj.getDashboardError(response));
					if(cb) {
						cb(response)
					}
				}
			})
			.catch(error => {
				dispatch(_obj.getDashboardError(error));
				if(cb) {
					cb(error)
				}
			});
		};
	},

	getChartDataError: function(error) {
		return {
			error,
			type: CommonConstants.GET_CHART_DATA_ERROR
		};
	},
	getChartDataSuccess: function(response) {
		return {
			response,
			type: CommonConstants.GET_CHART_DATA_SUCCESS
		};
	},
	getChartData: function(type) {
		let _obj = this;
		return dispatch => {
			fetch(ApiPathConstants.getApiPath() + 'ethereum/graph/' + type.toLowerCase() + "/", {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('access_token')}`
				}
			})
			.then(response => {
				if(response.status === 200) {
					response.json().then(function(res) {
						dispatch(_obj.getChartDataSuccess({
							type: type,
							data: res
						}));
	        		});
				}else {
					dispatch(_obj.getChartDataError(response));
				}
			})
			.catch(error => {
				dispatch(_obj.getChartDataError(error));
			});
		};
	},

	getHistoryLatestError: function(error) {
		return {
			error,
			type: CommonConstants.GET_HISTORY_LATEST_ERROR
		};
	},

	getHistoryLatestSuccess: function(response) {
		return {
			response,
			type: CommonConstants.GET_HISTORY_LATEST_SUCCESS
		};
	},

	getHistoryLatest: function(cb){
		let _obj = this;
		return dispatch => {
			fetch(ApiPathConstants.getApiPath() + "api/history/latest/")
			.then(response => {
				response.json().then(function(res) {
					dispatch(_obj.getHistoryLatestSuccess(res));
					cb(res)
        		});
			})
			.catch(error => {
				dispatch(_obj.getHistoryLatestError(error));
				cb(error)
			});
		};
	},

	getHistoryAllError: function(error) {
		return {
			error,
			type: CommonConstants.GET_HISTORY_ALL_ERROR
		};
	},

	getHistoryAllSuccess: function(response) {
		return {
			response,
			type: CommonConstants.GET_HISTORY_ALL_SUCCESS
		};
	},

	getHistoryAll: function(cb){
		let _obj = this;
		return dispatch => {
			fetch(ApiPathConstants.getApiPath() + "api/history/all/")
			.then(response => {
				response.json().then(function(res) {
					dispatch(_obj.getHistoryAllSuccess(res));
					cb(res)
        		});
			})
			.catch(error => {
				dispatch(_obj.getHistoryAllError(error));
				cb(error)
			});
		};
	},

	getNewsLatestError: function(error) {
		return {
			error,
			type: CommonConstants.GET_NEWS_LATEST_ERROR
		};
	},

	getNewsLatestSuccess: function(response) {
		return {
			response,
			type: CommonConstants.GET_NEWS_LATEST_SUCCESS
		};
	},

	getNewsLatest: function(){
		let _obj = this;
		return dispatch => {
			fetch(ApiPathConstants.getApiPath() + 'ethereum/cryptopanic_posts/', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('access_token')}`
				}
			})
			.then(response => {
				if(response.status === 200) {
					response.json().then(function(res) {
						dispatch(_obj.getNewsLatestSuccess(res));
	        		});
				}else {
					dispatch(_obj.getNewsLatestError(response));
				}
			})
			.catch(error => {
				dispatch(_obj.getNewsLatestError(error));
			});
		};
	},

	deleteHistoryError: function(error) {
		return {
			error,
			type: CommonConstants.DELETE_HISTORY_ERROR
		};
	},

	deleteHistorySuccess: function(response) {
		return {
			response,
			type: CommonConstants.DELETE_HISTORY_SUCCESS
		};
	},

	deleteHistory: function(data, cb){
		let _obj = this;
		return dispatch => {
			fetch(ApiPathConstants.getApiPath() + 'api/history/delete', {
                method: 'DELETE',
                body: JSON.stringify(data)
            })
			.then(response => {
				response.json().then(function(res) {
					dispatch(_obj.deleteHistorySuccess(res));
					if(cb != null){
						cb(res);
					}
        		});
			})
			.catch(error => {
				dispatch(_obj.deleteHistoryError(error));
				if(cb != null){
					cb(error);
				}
			});
		};
	},
};

export default DashboardActions;
