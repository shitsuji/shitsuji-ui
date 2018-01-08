import { combineEpics } from 'redux-observable';
import { loadApplicationsEpic, createApplicationEpic, navigateToApplicationsOnCreateEpic } from './ApplicationsEpics';

export const applicationsEpics = combineEpics(
  loadApplicationsEpic,
  createApplicationEpic,
  navigateToApplicationsOnCreateEpic
);