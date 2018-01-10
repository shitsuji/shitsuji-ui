// @flow
import { ApplicationsState, ApplicationDetailsState } from './applications';
import { RouterState } from 'react-router-redux';

export interface RootState {
  applications: ApplicationsState;
  applicationDetails: ApplicationDetailsState;
  router: RouterState;
}

export interface Record {
  '@rid': string;
  '@class': string;
}
