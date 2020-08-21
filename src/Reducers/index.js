import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import CommonReducer from './CommonReducer';
import DashboardReducer from './DashboardReducer';
import MoneyReducer from './MoneyReducer';
import ProfileReducer from './ProfileReducer';
import {reducer as notifications} from 'react-notification-system-redux';
import { i18nReducer } from 'react-redux-i18n';

const rootReducer = combineReducers({
  CommonReducer,
  DashboardReducer,
  MoneyReducer,
  ProfileReducer,
  notifications,
  routing,
  i18n: i18nReducer
});

export default rootReducer;
