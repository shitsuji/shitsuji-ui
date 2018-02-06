import { combineEpics } from 'redux-observable';
import {
  loadApplicationsEpic,
  createApplicationEpic,
  deleteApplicationEpic,
  navigateToApplicationsOnSuccessEpic,
  createApplicationToastEpic,
  deleteApplicationToastEpic
} from './ApplicationsEpics';
import {
  loadApplicationDetailsEpic,
  selectVersionEpic,
  selectVersionToastEpic
} from './ApplicationDetailsEpics';
import {
  createVersionEpic,
  deleteVersionEpic,
  navigateToVersionsOnSuccessEpic,
  createVersionToastEpic,
  deleteVersionToastEpic
} from './VersionsEpics';
import {
  editApplicationEpic,
  navigateToApplicationsOnEditEpic,
  editApplicationToastEpic
} from './EditApplicationEpics';
import {
  editVersionEpic,
  navigateToVersionsOnEditEpic,
  editVersionToastEpic
} from './EditVersionEpics';

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
  navigateToVersionsOnEditEpic,
  selectVersionEpic,
  selectVersionToastEpic,
  createApplicationToastEpic,
  deleteApplicationToastEpic,
  editApplicationToastEpic,
  editVersionToastEpic,
  createVersionToastEpic,
  deleteVersionToastEpic
);