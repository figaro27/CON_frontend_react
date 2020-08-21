import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistState } from 'redux-devtools';
import rootReducer from './Reducers';
import { routerMiddleware } from 'react-router-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';
import en from './I18n/en';
import da from './I18n/da';

const router = routerMiddleware(Router);
const logger = createLogger({
	level: 'info',
	collapsed: true
});

const translationsObject = {
	en: en,
	da: da
};

export function configureStore(initialState = {}) {
	const store = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(thunk, router, logger),
			persistState(
				window.location.href.match(
					/[?&]debug_session=([^&]+)\b/
				)
			)
		)
	);

	syncTranslationWithStore(store)
	store.dispatch(loadTranslations(translationsObject));

	let locale = 'en';
	if(localStorage.getItem('lang')) {
		locale = localStorage.getItem('lang')
	}else {
		locale = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
		locale = (locale) ? locale.split('-')[0] : 'en'
		if(locale !== 'en' && locale !== 'da') {
			locale = 'da'
		}
		localStorage.setItem('lang', locale)
	}

	let currentPath = window.location.pathname;
	let paths = currentPath.split('/')
	if(paths.length > 0) {
		let lang = paths[paths.length-1]
		if(lang === 'da' || lang === 'en') {
			localStorage.setItem('lang', lang)
			locale = lang
		}else {
			let loc = window.location.href
			if(loc.slice(-1) !== '/') {
				loc += '/'	
			}
			loc += locale
			window.history.pushState(null, null, loc);
		}
	}

	store.dispatch(setLocale(locale));

	return store;
}
