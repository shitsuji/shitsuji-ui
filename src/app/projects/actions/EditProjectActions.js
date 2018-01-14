// @flow
import { Action } from 'redux';
import { actionCreator } from '../../helpers';
import { Project } from '../models';

export const EDIT_PROJECT_REQUEST = 'EDIT_PROJECT_REQUEST';
export const EDIT_PROJECT_SUCCESS = 'EDIT_PROJECT_SUCCESS';
export const EDIT_PROJECT_FAILURE = 'EDIT_PROJECT_FAILURE';

export interface EditProjectRequestAction extends Action {
  payload: Project;
}

export const editProjectRequest = actionCreator(EDIT_PROJECT_REQUEST);

export interface EditProjectSuccessAction extends Action {
  payload: Project;
}

export const editProjectSuccess = actionCreator(EDIT_PROJECT_SUCCESS);

export interface EditProjectFailureAction extends Action {
  payload: null;
}

export const editProjectFailure = actionCreator(EDIT_PROJECT_FAILURE);