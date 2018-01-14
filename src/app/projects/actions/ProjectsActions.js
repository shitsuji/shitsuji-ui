// @flow
import { Action } from 'redux';
import { actionCreator } from '../../helpers';
import { Project, ProjectCreateData } from '../models';

export const LOAD_PROJECTS_REQUEST = 'LOAD_PROJECTS_REQUEST';
export const LOAD_PROJECTS_SUCCESS = 'LOAD_PROJECTS_SUCCESS';
export const LOAD_PROJECTS_FAILURE = 'LOAD_PROJECTS_FAILURE';
export const CREATE_PROJECT_REQUEST = 'CREATE_PROJECT_REQUEST';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
export const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE';
export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST';
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
export const DELETE_PROJECT_FAILURE = 'DELETE_PROJECT_FAILURE';

export interface LoadProjectsRequestAction extends Action {
  payload: { search: string };
}

export const loadProjectsRequest = actionCreator(LOAD_PROJECTS_REQUEST);

export interface LoadProjectsSuccessAction extends Action {
  payload: Project[];
}

export const loadProjectsSuccess = actionCreator(LOAD_PROJECTS_SUCCESS);

export interface LoadProjectsFailureAction extends Action {
  payload: null;
}

export const loadProjectsFailure = actionCreator(LOAD_PROJECTS_FAILURE);

export interface CreateProjectRequestAction extends Action {
  payload: ProjectCreateData;
}

export const createProjectRequest = actionCreator(CREATE_PROJECT_REQUEST);

export interface CreateProjectSuccessAction extends Action {
  payload: Project;
}

export const createProjectSuccess = actionCreator(CREATE_PROJECT_SUCCESS);

export interface CreateProjectFailureAction extends Action {
  payload: null;
}

export const createProjectFailure = actionCreator(CREATE_PROJECT_FAILURE);

export interface DeleteProjectRequestAction extends Action {
  payload: {
    projectId: string;
  };
}

export const deleteProjectRequest = actionCreator(DELETE_PROJECT_REQUEST);

export interface DeleteProjectSuccessAction extends Action {
  payload: {
    projectId: string;
  };
}

export const deleteProjectSuccess = actionCreator(DELETE_PROJECT_SUCCESS);

export interface DeleteProjectFailureAction extends Action {
  payload: null;
}

export const deleteProjectFailure = actionCreator(DELETE_PROJECT_FAILURE);