import { combineEpics } from 'redux-observable';
import { loadApplicationsEpic, createApplicationEpic } from './ApplicationsEpics';

export const applicationsEpics = combineEpics(
  loadApplicationsEpic,
  createApplicationEpic
);