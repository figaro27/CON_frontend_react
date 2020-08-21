import moment from 'moment'

// const getInstance = function() {
// 	var dom = document.getElementById("admin-layout");
// 	const instance =  dom[Object.keys(dom).find(key =>
// 	    key.startsWith('__reactInternalInstance$'))];
// 	return instance.return.stateNode;
// }

let Utils = {
	toDateTime: (secs) => {
		var t = new Date(1970, 0, 1); // Epoch
		t.setSeconds(secs);
		var tt = t.toTimeString().slice(0,2) + ":00 / " + t.toJSON().slice(0,4) + "-" + t.toJSON().slice(8,10) + "-" + t.toJSON().slice(5,7)
		return tt;
	},

	getTopBar: () => {
		var dom = document.getElementById("top-bar");
		const internalInstance = dom[Object.keys(dom).find(key =>
			key.startsWith('__reactInternalInstance$'))];
		return internalInstance.return.stateNode
	},

	openPageLoadingNotification: () => {
	},

	/**
	 * @link https://auth0.com/docs/api/management/v2#!/Users/get_logs_by_user
	 * @param {*} action_type
	 */
	getReadableActionType(action_type) {
		const translations = {
				's': 'Du er logget ind successfuldt',
				'f': 'Fejlet log ind',
				'slo': 'Successfuld log ud'
		};

		if (!(action_type in translations)) {
			return `Ukendt handling. Kontakt os for mere information (${action_type})`;
		}

		return translations[action_type];
	},

	formatDate: (string) => {
		return moment.utc(string).local().format('DD/MM/YYYY - HH:mm:ss');
	},

	cutOff: (num, len) => {
		if(typeof num === 'undefined' || num === null) {
			num = 0;
		}

		let m = num.toString().match(new RegExp("(\\d+\\.\\d{" + len + "})(\\d+)"));
		let ret = m ? m[1] : parseFloat(num, 10).toFixed(len);
		if(num < 0) {
			return ret * (-1)
		}

		return ret
	}
};

export default Utils;
