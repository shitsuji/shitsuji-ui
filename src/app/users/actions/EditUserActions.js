// @flow
import { Action } from 'redux';
import { actionCreator } from '../../helpers';
import { User } from '../models';

export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';

export interface EditUserRequestAction extends Action {
  payload: User;
}

export const editUserRequest = actionCreator(EDIT_USER_REQUEST);

export interface EditUserSuccessAction extends Action {
  payload: User;
}

export const editUserSuccess = actionCreator(EDIT_USER_SUCCESS);

export interface EditUserFailureAction extends Action {
  payload: null;
}

export const editUserFailure = actionCreator(EDIT_USER_FAILURE);