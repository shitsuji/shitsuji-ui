// @flow
import { ApplicationsState, ApplicationDetailsState } from './models';

export const APPLICATIONS_INITIAL_STATE: ApplicationsState = {
  applications: null,
  pending: true
};

export const APPLICATION_DETAILS_INITIAL_STATE: ApplicationDetailsState = {
  application: null,
  pending: true,
  versions: null,
  selectedVersionId: null,
  dependees: null,
  dependers: null
};

export const APPLICATIONS_PATH = '/applications';
export const CREATE_APPLICATION_PATH = `${APPLICATIONS_PATH}/create`;
export const VERSIONS_PATH = '/versions';