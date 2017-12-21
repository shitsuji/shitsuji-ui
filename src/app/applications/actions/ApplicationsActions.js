// @flow
import { Action } from 'redux';
import { actionCreator } from '../../helpers';

export const LOAD_APPLICATIONS_REQUEST = 'LOAD_APPLICATIONS_REQUEST';
export const LOAD_APPLICATIONS_SUCCESS = 'LOAD_APPLICATIONS_SUCCESS';
export const LOAD_APPLICATIONS_FAILURE = 'LOAD_APPLICATIONS_FAILURE';

export interface LoadApplicationsRequestAction extends Action {
  payload: null;
}

export const loadApplicationsRequest = actionCreator(LOAD_APPLICATIONS_REQUEST);

export interface LoadApplicationsSuccessAction extends Action {
  payload: null;
}

export const loadApplicationsSuccess = actionCreator(LOAD_APPLICATIONS_SUCCESS);

export interface LoadApplicationsFailureAction extends Action {
  payload: null;
}

export const loadApplicationsFailure = actionCreator(LOAD_APPLICATIONS_FAILURE);
