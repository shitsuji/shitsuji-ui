// @flow
import { Action } from 'redux';
import { actionCreator } from '../../helpers';
import { Version, VersionCreateData } from '../models';

export const CREATE_VERSION_REQUEST = 'CREATE_VERSION_REQUEST';
export const CREATE_VERSION_SUCCESS = 'CREATE_VERSION_SUCCESS';
export const CREATE_VERSION_FAILURE = 'CREATE_VERSION_FAILURE';

export interface CreateVersionRequestAction extends Action {
  payload: {
    version: VersionCreateData;
    applicationId: string;
  };
}

export const createVersionRequest = actionCreator(CREATE_VERSION_REQUEST);

export interface CreateVersionSuccessAction extends Action {
  payload: {
    version: Version;
    applicationId: string;
  };
}

export const createVersionSuccess = actionCreator(CREATE_VERSION_SUCCESS);

export interface CreateVersionFailureAction extends Action {
  payload: null;
}

export const createVersionFailure = actionCreator(CREATE_VERSION_FAILURE);