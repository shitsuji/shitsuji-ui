// @flow
import { ApplicationsState } from './applications';
import { RouterState } from 'react-router-redux';

export interface RootState {
  applications: ApplicationsState;
  router: RouterState;
}