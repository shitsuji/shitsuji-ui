import { combineEpics } from 'redux-observable';
import { loadApplicationsEpic, createApplicationEpic, navigateToApplicationsOnCreateEpic } from './ApplicationsEpics';
import { loadApplicationDetailsEpic } from './ApplicationDetailsEpics';

export const applicationsEpics = combineEpics(
  loadApplicationsEpic,
  createApplicationEpic,
  navigateToApplicationsOnCreateEpic,
  loadApplicationDetailsEpic
);