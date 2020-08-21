import CommonConstants from '../Constants/CommonConstants';
import ApiPathConstants from '../Constants/ApiPathConstants';

let CommonActions = {
	getProfileInfoError: function(error) {
		return {
			error,
			type: CommonConstants.GET_PROFILE_INFO_ERROR
		};
	},

	getProfileInfoSuccess: function(response) {
		return {
			response,
			type: CommonConstants.GET_PROFILE_INFO_SUCCESS
		};
	},

	getProfileInfo: function(cb){
		let _obj = this;
		return dispatch => {
			fetch(ApiPathConstants.getApiPath() + 'profile/info/', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('access_token')}`
				}
			})
			.then(response => {
				if(response.ok){
					response.json().then(function(res) {
						dispatch(_obj.getProfileInfoSuccess(res));
						if(cb != null){
							cb(res);
						}
	        		});
	        	}else{
					let _error={
						status: response.status,
						error: response.statusText
					};
					dispatch(_obj.getProfileInfoError(_error));
					if(cb != null){
						cb(_error);
					}
	        	}
			})
			.catch(error => {
				dispatch(_obj.getProfileInfoError(error));
				if(cb != null){
					cb(error);
				}
			});
		};
	},

	getProfileLogsError: function(error) {
		return {
			error,
			type: CommonConstants.GET_PROFILE_LOGS_ERROR
		};
	},

	getProfileLogsSuccess: function(response) {
		return {
			response,
			type: CommonConstants.GET_PROFILE_LOGS_SUCCESS
		};
	},

	getProfileLogs: function(cb){
		let _obj = this;
		return dispatch => {
			fetch(ApiPathConstants.getApiPath() + 'money/user_logs/', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('access_token')}`
				}
			})
			.then(response => {
				if(response.ok){
					response.json().then(function(res) {
						dispatch(_obj.getProfileLogsSuccess(res));
						if(cb != null){
							cb(res);
						}
	        		});
	        	}else{
					let _error={
						status: response.status,
						error: response.statusText
					};
					dispatch(_obj.getProfileLogsError(_error));
					if(cb != null){
						cb(_error);
					}
	        	}
			})
			.catch(error => {
				dispatch(_obj.getProfileLogsError(error));
				if(cb != null){
					cb(error);
				}
			});
		};
	},

	addProfileLogError: function(error) {
		return {
			error,
			type: CommonConstants.ADD_PROFILE_LOG_ERROR
		};
	},

	addProfileLogSuccess: function(response) {
		return {
			response,
			type: CommonConstants.ADD_PROFILE_LOG_SUCCESS
		};
	},

	addProfileLog: function(cb){
		let _obj = this;
		return dispatch => {
			fetch(ApiPathConstants.getApiPath() + 'profile/logs/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('access_token')}`
				}
			})
			.then(response => {
				if(response.ok){
					response.json().then(function(res) {
						dispatch(_obj.addProfileLogSuccess(res));
						if(cb != null){
							cb(res);
						}
	        		});
	        	}else{
					let _error={
						status: response.status,
						error: response.statusText
					};
					dispatch(_obj.addProfileLogError(_error));
					if(cb != null){
						cb(_error);
					}
	        	}
			})
			.catch(error => {
				dispatch(_obj.addProfileLogError(error));
				if(cb != null){
					cb(error);
				}
			});
		};
	},

	updateProfileError: function(error) {
		return {
			error,
			type: CommonConstants.UPDATE_PROFILE_ERROR
		};
	},

	updateProfileSuccess: function(response) {
		return {
			response,
			type: CommonConstants.UPDATE_PROFILE_SUCCESS
		};
	},

	updateProfile: function(data, cb){
		let _obj = this;
		return dispatch => {
			fetch(ApiPathConstants.getApiPath() + 'profile/info/', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('access_token')}`
				},
				body: JSON.stringify(data)
			})
			.then(response => {
				if(response.ok){
					response.json().then(function(res) {
						dispatch(_obj.updateProfileSuccess(res));
						if(cb != null){
							cb(res);
						}
	        		});
	        	}else{
					let _error={
						status: response.status,
						error: response.statusText
					};
					dispatch(_obj.updateProfileError(_error));
					if(cb != null){
						cb(_error);
					}
	        	}
			})
			.catch(error => {
				dispatch(_obj.updateProfileError(error));
				if(cb != null){
					cb(error);
				}
			});
		};
	}
};

export default CommonActions;
