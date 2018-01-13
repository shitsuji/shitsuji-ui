// @flow
import { Action } from 'redux';
import { actionCreator } from '../../helpers';
import { Application } from '../models';

export const EDIT_APPLICATION_REQUEST = 'EDIT_APPLICATION_REQUEST';
export const EDIT_APPLICATION_SUCCESS = 'EDIT_APPLICATION_SUCCESS';
export const EDIT_APPLICATION_FAILURE = 'EDIT_APPLICATION_FAILURE';

export interface EditApplicationRequestAction extends Action {
  payload: Application;
}

export const editApplicationRequest = actionCreator(EDIT_APPLICATION_REQUEST);

export interface EditApplicationSuccessAction extends Action {
  payload: Application;
}

export const editApplicationSuccess = actionCreator(EDIT_APPLICATION_SUCCESS);

export interface EditApplicationFailureAction extends Action {
  payload: null;
}

export const editApplicationFailure = actionCreator(EDIT_APPLICATION_FAILURE);