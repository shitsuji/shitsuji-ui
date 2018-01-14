// @flow
import { Action } from 'redux';
import { actionCreator } from '../../helpers';
import { Project } from '../models';

export const LOAD_PROJECT_DETAILS_REQUEST = 'LOAD_PROJECT_DETAILS_REQUEST';
export const LOAD_PROJECT_DETAILS_SUCCESS = 'LOAD_PROJECT_DETAILS_SUCCESS';
export const LOAD_PROJECT_DETAILS_FAILURE = 'LOAD_PROJECT_DETAILS_FAILURE';

export interface LoadProjectDeatilsRequestAction extends Action {
  payload: { projectId: string };
}

export const loadProjectDeatilsRequest = actionCreator(LOAD_PROJECT_DETAILS_REQUEST);

export interface LoadProjectDeatilsSuccessAction extends Action {
  payload: {
    project: Project;
  };
}

export const loadProjectDeatilsSuccess = actionCreator(LOAD_PROJECT_DETAILS_SUCCESS);

export interface LoadProjectDeatilsFailureAction extends Action {
  payload: null;
}

export const loadProjectDeatilsFailure = actionCreator(LOAD_PROJECT_DETAILS_FAILURE);
