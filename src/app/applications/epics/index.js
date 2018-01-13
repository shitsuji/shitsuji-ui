import { combineEpics } from 'redux-observable';
import { loadApplicationsEpic, createApplicationEpic, deleteApplicationEpic, navigateToApplicationsOnSuccessEpic } from './ApplicationsEpics';
import { loadApplicationDetailsEpic } from './ApplicationDetailsEpics';
import { createVersionEpic, deleteVersionEpic, navigateToVersionsOnSuccessEpic } from './VersionsEpics';
import { editApplicationEpic, navigateToApplicationsOnEditEpic } from './EditApplicationEpics';
import { editVersionEpic, navigateToVersionsOnEditEpic } from './EditVersionEpics';

export const applicationsEpics = combineEpics(
  loadApplicationsEpic,
  createApplicationEpic,
  deleteApplicationEpic,
  navigateToApplicationsOnSuccessEpic,
  loadApplicationDetailsEpic,
  createVersionEpic,
  deleteVersionEpic,
  navigateToVersionsOnSuccessEpic,
  editApplicationEpic,
  navigateToApplicationsOnEditEpic,
  editVersionEpic,
  navigateToVersionsOnEditEpic
);