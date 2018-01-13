// @flow
import { Action } from 'redux';
import { actionCreator } from '../../helpers';
import { Application, ApplicationCreateData } from '../models';

export const LOAD_APPLICATIONS_REQUEST = 'LOAD_APPLICATIONS_REQUEST';
export const LOAD_APPLICATIONS_SUCCESS = 'LOAD_APPLICATIONS_SUCCESS';
export const LOAD_APPLICATIONS_FAILURE = 'LOAD_APPLICATIONS_FAILURE';
export const CREATE_APPLICATION_REQUEST = 'CREATE_APPLICATION_REQUEST';
export const CREATE_APPLICATION_SUCCESS = 'CREATE_APPLICATION_SUCCESS';
export const CREATE_APPLICATION_FAILURE = 'CREATE_APPLICATION_FAILURE';
export const DELETE_APPLICATION_REQUEST = 'DELETE_APPLICATION_REQUEST';
export const DELETE_APPLICATION_SUCCESS = 'DELETE_APPLICATION_SUCCESS';
export const DELETE_APPLICATION_FAILURE = 'DELETE_APPLICATION_FAILURE';

export interface LoadApplicationsRequestAction extends Action {
  payload: { search: string };
}

export const loadApplicationsRequest = actionCreator(LOAD_APPLICATIONS_REQUEST);

export interface LoadApplicationsSuccessAction extends Action {
  payload: Application[];
}

export const loadApplicationsSuccess = actionCreator(LOAD_APPLICATIONS_SUCCESS);

export interface LoadApplicationsFailureAction extends Action {
  payload: null;
}

export const loadApplicationsFailure = actionCreator(LOAD_APPLICATIONS_FAILURE);

export interface CreateApplicationRequestAction extends Action {
  payload: ApplicationCreateData;
}

export const createApplicationRequest = actionCreator(CREATE_APPLICATION_REQUEST);

export interface CreateApplicationSuccessAction extends Action {
  payload: Application;
}

export const createApplicationSuccess = actionCreator(CREATE_APPLICATION_SUCCESS);

export interface CreateApplicationFailureAction extends Action {
  payload: null;
}

export const createApplicationFailure = actionCreator(CREATE_APPLICATION_FAILURE);

export interface DeleteApplicationRequestAction extends Action {
  payload: {
    applicationId: string;
  };
}

export const deleteApplicationRequest = actionCreator(DELETE_APPLICATION_REQUEST);

export interface DeleteApplicationSuccessAction extends Action {
  payload: {
    applicationId: string;
  };
}

export const deleteApplicationSuccess = actionCreator(DELETE_APPLICATION_SUCCESS);

export interface DeleteApplicationFailureAction extends Action {
  payload: null;
}

export const deleteApplicationFailure = actionCreator(DELETE_APPLICATION_FAILURE);