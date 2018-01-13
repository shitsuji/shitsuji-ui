// @flow
import { Action } from 'redux';
import { actionCreator } from '../../helpers';
import { Version } from '../models';

export const EDIT_VERSION_REQUEST = 'EDIT_VERSION_REQUEST';
export const EDIT_VERSION_SUCCESS = 'EDIT_VERSION_SUCCESS';
export const EDIT_VERSION_FAILURE = 'EDIT_VERSION_FAILURE';

export interface EditVersionRequestAction extends Action {
  payload: {
    version: Version;
    applicationId: string;
  };
}

export const editVersionRequest = actionCreator(EDIT_VERSION_REQUEST);

export interface EditVersionSuccessAction extends Action {
  payload: {
    version: Version;
    applicationId: string;
  };
}

export const editVersionSuccess = actionCreator(EDIT_VERSION_SUCCESS);

export interface EditVersionFailureAction extends Action {
  payload: null;
}

export const editVersionFailure = actionCreator(EDIT_VERSION_FAILURE);