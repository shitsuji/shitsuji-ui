// @flow
import { Action } from 'redux';
import { actionCreator } from '../../helpers';
import { Application, Version } from '../models';

export const LOAD_APPLICATION_DETAILS_REQUEST = 'LOAD_APPLICATION_DETAILS_REQUEST';
export const LOAD_APPLICATION_DETAILS_SUCCESS = 'LOAD_APPLICATION_DETAILS_SUCCESS';
export const LOAD_APPLICATION_DETAILS_FAILURE = 'LOAD_APPLICATION_DETAILS_FAILURE';

export interface LoadApplicationDeatilsRequestAction extends Action {
  payload: { applicationId: string };
}

export const loadApplicationDeatilsRequest = actionCreator(LOAD_APPLICATION_DETAILS_REQUEST);

export interface LoadApplicationDeatilsSuccessAction extends Action {
  payload: {
    application: Application;
    versions?: Version[];
  };
}

export const loadApplicationDeatilsSuccess = actionCreator(LOAD_APPLICATION_DETAILS_SUCCESS);

export interface LoadApplicationDeatilsFailureAction extends Action {
  payload: null;
}

export const loadApplicationDeatilsFailure = actionCreator(LOAD_APPLICATION_DETAILS_FAILURE);
