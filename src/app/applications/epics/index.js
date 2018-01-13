import { combineEpics } from 'redux-observable';
import { loadApplicationsEpic, createApplicationEpic, navigateToApplicationsOnCreateEpic } from './ApplicationsEpics';
import { loadApplicationDetailsEpic } from './ApplicationDetailsEpics';
import { createVersionEpic, navigateToVersionsOnCreateEpic } from './VersionsEpics';

export const applicationsEpics = combineEpics(
  loadApplicationsEpic,
  createApplicationEpic,
  navigateToApplicationsOnCreateEpic,
  loadApplicationDetailsEpic,
  createVersionEpic,
  navigateToVersionsOnCreateEpic
);