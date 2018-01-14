// @flow
import { Action } from 'redux';
import { actionCreator } from '../../helpers';
import { Repository, RepositoryCreateData } from '../models';

export const LOAD_REPOSITORIES_REQUEST = 'LOAD_REPOSITORIES_REQUEST';
export const LOAD_REPOSITORIES_SUCCESS = 'LOAD_REPOSITORIES_SUCCESS';
export const LOAD_REPOSITORIES_FAILURE = 'LOAD_REPOSITORIES_FAILURE';
export const CREATE_REPOSITORY_REQUEST = 'CREATE_REPOSITORY_REQUEST';
export const CREATE_REPOSITORY_SUCCESS = 'CREATE_REPOSITORY_SUCCESS';
export const CREATE_REPOSITORY_FAILURE = 'CREATE_REPOSITORY_FAILURE';
export const DELETE_REPOSITORY_REQUEST = 'DELETE_REPOSITORY_REQUEST';
export const DELETE_REPOSITORY_SUCCESS = 'DELETE_REPOSITORY_SUCCESS';
export const DELETE_REPOSITORY_FAILURE = 'DELETE_REPOSITORY_FAILURE';

export interface LoadRepositoriesRequestAction extends Action {
  payload: { search: string };
}

export const loadRepositoriesRequest = actionCreator(LOAD_REPOSITORIES_REQUEST);

export interface LoadRepositoriesSuccessAction extends Action {
  payload: Repository[];
}

export const loadRepositoriesSuccess = actionCreator(LOAD_REPOSITORIES_SUCCESS);

export interface LoadRepositoriesFailureAction extends Action {
  payload: null;
}

export const loadRepositoriesFailure = actionCreator(LOAD_REPOSITORIES_FAILURE);

export interface CreateRepositoryRequestAction extends Action {
  payload: RepositoryCreateData;
}

export const createRepositoryRequest = actionCreator(CREATE_REPOSITORY_REQUEST);

export interface createRepositorySuccessAction extends Action {
  payload: Repository;
}

export const createRepositorySuccess = actionCreator(CREATE_REPOSITORY_SUCCESS);

export interface CreateRepositoryFailureAction extends Action {
  payload: null;
}

export const createRepositoryFailure = actionCreator(CREATE_REPOSITORY_FAILURE);

export interface DeleteRepositoryRequestAction extends Action {
  payload: {
    repositoryId: string;
  };
}

export const deleteRepositoryRequest = actionCreator(DELETE_REPOSITORY_REQUEST);

export interface DeleteRepositorySuccessAction extends Action {
  payload: {
    repositoryId: string;
  };
}

export const deleteRepositorySuccess = actionCreator(DELETE_REPOSITORY_SUCCESS);

export interface DeleteRepositoryFailureAction extends Action {
  payload: null;
}

export const deleteRepositoryFailure = actionCreator(DELETE_REPOSITORY_FAILURE);