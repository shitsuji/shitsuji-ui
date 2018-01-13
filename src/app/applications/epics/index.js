import { combineEpics } from 'redux-observable';
import { loadApplicationsEpic, createApplicationEpic, deleteApplicationEpic, navigateToApplicationsOnSuccessEpic } from './ApplicationsEpics';
import { loadApplicationDetailsEpic } from './ApplicationDetailsEpics';
import { createVersionEpic, deleteVersionEpic, navigateToVersionsOnSuccessEpic } from './VersionsEpics';
import { editApplicationEpic, navigateToApplicationsOnEditEpic } from './EditApplicationEpics';

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
  navigateToApplicationsOnEditEpic
);