import CommonConstants from '../Constants/CommonConstants';
import ApiPathConstants from '../Constants/ApiPathConstants';

let CommonActions = {
	getMoneyBackendError: function(error) {
		return {
			error,
			type: CommonConstants.GET_MONEY_BACKEND_ERROR
		};
	},

	getMoneyBackendSuccess: function(response) {
		return {
			response,
			type: CommonConstants.GET_MONEY_BACKEND_SUCCESS
		};
	},

	getMoneyBackend: function(cb){
		let _obj = this;
		return dispatch => {
			fetch(ApiPathConstants.getApiPath() + 'money/backend/', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('access_token')}`
				}
			})
			.then(response => {
				if(response.ok){
					response.json().then(function(res) {
						dispatch(_obj.getMoneyBackendSuccess(res));
						if(cb != null){
							cb(res);
						}
	        		});
	        	}else{
					let _error={
						status: response.status,
						error: response.statusText
					};
					dispatch(_obj.getMoneyBackendError(_error));
					if(cb != null){
						cb(_error);
					}
	        	}
			})
			.catch(error => {
				dispatch(_obj.getMoneyBackendError(error));
				if(cb != null){
					cb(error);
				}
			});
		};
	},

	sendEmailError: function(error) {
		return {
			error,
			type: CommonConstants.SEND_EMAIL_ERROR
		};
	},

	sendEmailSuccess: function(response) {
		return {
			response,
			type: CommonConstants.SEND_EMAIL_SUCCESS
		};
	},

	sendEmail: function(data, cb){
		let _obj = this;
		return dispatch => {
			fetch(ApiPathConstants.getApiPath() + "api/send_email/", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
			.then(response => {
				if(response.ok) {
					response.json().then(function(res) {
						dispatch(_obj.sendEmailSuccess(res));
						cb(res);
					});
				}else {
					let _error={
						status: response.status,
						error: response.statusText
					};
					dispatch(_obj.sendEmailError(_error));
					if(cb != null){
						cb(_error);
					}
				}
			})
			.catch(error => {
				dispatch(_obj.sendEmailError(error));
				cb(error);
			});
		};
	},

	sendNotificationEmailError: function(error) {
		return {
			error,
			type: CommonConstants.SEND_NOTIFICATION_EMAIL_ERROR
		};
	},

	sendNotificationEmailSuccess: function(response) {
		return {
			response,
			type: CommonConstants.SEND_NOTIFICATION_EMAIL_SUCCESS
		};
	},

	sendNotificationEmail: function(data){
		let _obj = this;
		return dispatch => {
			fetch(ApiPathConstants.getApiPath() + "profile/notification_email/", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('access_token')}`
				},
				body: JSON.stringify(data)
			})
			.then(response => {
				if(response.ok) {
					response.json().then(function(res) {
						dispatch(_obj.sendNotificationEmailSuccess(res));
					});
				}else {
					let _error={
						status: response.status,
						error: response.statusText
					};
					dispatch(_obj.sendNotificationEmailError(_error));
				}
			})
			.catch(error => {
				dispatch(_obj.sendEmailError(error));
			});
		};
	}
};

export default CommonActions;
