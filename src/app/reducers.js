// @flow
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { applicationsReducer } from './applications';

export const rootReducer = combineReducers({
  applications: applicationsReducer,
  router: routerReducer
});