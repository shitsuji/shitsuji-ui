// @flow
import { Action } from 'redux';
import { actionCreator } from '../../helpers';
import { Version, VersionCreateData, Dependency } from '../models';

export const CREATE_VERSION_REQUEST = 'CREATE_VERSION_REQUEST';
export const CREATE_VERSION_SUCCESS = 'CREATE_VERSION_SUCCESS';
export const CREATE_VERSION_FAILURE = 'CREATE_VERSION_FAILURE';
export const DELETE_VERSION_REQUEST = 'DELETE_VERSION_REQUEST';
export const DELETE_VERSION_SUCCESS = 'DELETE_VERSION_SUCCESS';
export const DELETE_VERSION_FAILURE = 'DELETE_VERSION_FAILURE';

export interface CreateVersionRequestAction extends Action {
  payload: {
    version: VersionCreateData;
    applicationId: string;
    dependencies: Dependency[];
  };
}

export const createVersionRequest = actionCreator(CREATE_VERSION_REQUEST);

export interface CreateVersionSuccessAction extends Action {
  payload: {
    version: Version;
    applicationId: string;
    dependees: Dependency[];
  };
}

export const createVersionSuccess = actionCreator(CREATE_VERSION_SUCCESS);

export interface CreateVersionFailureAction extends Action {
  payload: null;
}

export const createVersionFailure = actionCreator(CREATE_VERSION_FAILURE);

export interface DeleteVersionRequestAction extends Action {
  payload: {
    versionId: string;
    applicationId: string;
  };
}

export const deleteVersionRequest = actionCreator(DELETE_VERSION_REQUEST);

export interface DeleteVersionSuccessAction extends Action {
  payload: {
    versionId: string;
    applicationId: string;
  };
}

export const deleteVersionSuccess = actionCreator(DELETE_VERSION_SUCCESS);

export interface DeleteVersionFailureAction extends Action {
  payload: null;
}

export const deleteVersionFailure = actionCreator(DELETE_VERSION_FAILURE);