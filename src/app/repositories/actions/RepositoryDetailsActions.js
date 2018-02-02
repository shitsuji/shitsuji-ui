// @flow
import { Action } from 'redux';
import { actionCreator } from '../../helpers';
import { Repository } from '../models';
import { Application } from '../../applications';

export const LOAD_REPOSITORY_DETAILS_REQUEST = 'LOAD_REPOSITORY_DETAILS_REQUEST';
export const LOAD_REPOSITORY_DETAILS_SUCCESS = 'LOAD_REPOSITORY_DETAILS_SUCCESS';
export const LOAD_REPOSITORY_DETAILS_FAILURE = 'LOAD_REPOSITORY_DETAILS_FAILURE';
export const INITIALIZE_REPOSITORY_REQUEST = 'INITIALIZE_REPOSITORY_REQUEST';
export const INITIALIZE_REPOSITORY_SUCCESS = 'INITIALIZE_REPOSITORY_SUCCESS';
export const INITIALIZE_REPOSITORY_FAILURE = 'INITIALIZE_REPOSITORY_FAILURE';


export interface LoadRepositoryDeatilsRequestAction extends Action {
  payload: { repositoryId: string };
}

export const loadRepositoryDeatilsRequest = actionCreator(LOAD_REPOSITORY_DETAILS_REQUEST);

export interface LoadRepositoryDeatilsSuccessAction extends Action {
  payload: {
    repository: Repository;
    applications: Application[];
  };
}

export const loadRepositoryDeatilsSuccess = actionCreator(LOAD_REPOSITORY_DETAILS_SUCCESS);

export interface LoadRepositoryDeatilsFailureAction extends Action {
  payload: null;
}

export const loadRepositoryDeatilsFailure = actionCreator(LOAD_REPOSITORY_DETAILS_FAILURE);

export interface InitializeRepositoryRequestAction extends Action {
  payload: { repositoryId: string };
}

export const initializeRepositoryRequest = actionCreator(INITIALIZE_REPOSITORY_REQUEST);

export interface InitializeRepositorySuccessAction extends Action {
  payload: {
    repository: Repository;
    applications: Application[];
  };
}

export const initializeRepositorySuccess = actionCreator(INITIALIZE_REPOSITORY_SUCCESS);

export interface InitializeRepositoryFailureAction extends Action {
  payload: null;
}

export const initializeRepositoryFailure = actionCreator(INITIALIZE_REPOSITORY_FAILURE);
