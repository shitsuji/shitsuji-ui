// @flow
import { Action } from 'redux';
import { actionCreator } from '../../helpers';
import { Repository } from '../models';

export const EDIT_REPOSITORY_REQUEST = 'EDIT_REPOSITORY_REQUEST';
export const EDIT_REPOSITORY_SUCCESS = 'EDIT_REPOSITORY_SUCCESS';
export const EDIT_REPOSITORY_FAILURE = 'EDIT_REPOSITORY_FAILURE';

export interface EditRepositoryRequestAction extends Action {
  payload: Repository;
}

export const editRepositoryRequest = actionCreator(EDIT_REPOSITORY_REQUEST);

export interface EditRepositorySuccessAction extends Action {
  payload: Repository;
}

export const editRepositorySuccess = actionCreator(EDIT_REPOSITORY_SUCCESS);

export interface EditRepositoryFailureAction extends Action {
  payload: null;
}

export const editRepositoryFailure = actionCreator(EDIT_REPOSITORY_FAILURE);