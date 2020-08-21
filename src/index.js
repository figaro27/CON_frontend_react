import React from 'react';
import ReactDOM from 'react-dom';
import ReactSEO from 'react-seo';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './index.css';

const urls = [
	{ url: '/', ajaxFunction: ajaxFunc },
	{ url: '/updateprofile', ajaxFunction: ajaxFunc },
	{ url: '/payout', ajaxFunction: ajaxFunc },
	{ url: '/reporting', ajaxFunction: ajaxFunc },
	{ url: '/settings', ajaxFunction: ajaxFunc },
	{ url: '/privacypolicy', ajaxFunction: ajaxFunc },
	{ url: '/feestructure', ajaxFunction: ajaxFunc },
	{ url: '/termsservice', ajaxFunction: ajaxFunc },
	{ url: '/history', ajaxFunction: ajaxFunc },
	{ url: '/contactus', ajaxFunction: ajaxFunc },
	{ url: '/buysell', ajaxFunction: ajaxFunc },
	{ url: '/invest', ajaxFunction: ajaxFunc },
	{ url: '/progress', ajaxFunction: ajaxFunc },
	{ url: '/mobileaccess', ajaxFunction: ajaxFunc },
	{ url: '/login', ajaxFunction: ajaxFunc },
	{ url: '/login-nemid', ajaxFunction: ajaxFunc },
	{ url: '/logout', ajaxFunction: ajaxFunc },
	{ url: '/register', ajaxFunction: ajaxFunc },
	{ url: '/thankyou', ajaxFunction: ajaxFunc },
	{ url: '/maintance', ajaxFunction: ajaxFunc }
];
ReactSEO.startMagic(urls, renderDOM);

function renderDOM(){
	ReactDOM.render(<App />, document.getElementById('root'));
}

function ajaxFunc(param,resolve){
	if (resolve) {
		resolve();
	}
}
registerServiceWorker();
