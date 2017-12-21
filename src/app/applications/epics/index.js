import { combineEpics } from 'redux-observable';
import { loadApplicationsEpic } from './ApplicationsEpics';

export const applicationsEpics = combineEpics(
  loadApplicationsEpic
);