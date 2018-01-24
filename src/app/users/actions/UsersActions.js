// @flow
import { Action } from 'redux';
import { actionCreator } from '../../helpers';
import { User, UserCreateData } from '../models';

export const LOAD_USERS_REQUEST = 'LOAD_USERS_REQUEST';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_FAILURE = 'LOAD_USERS_FAILURE';
export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export interface LoadUsersRequestAction extends Action {
  payload: { search: string };
}

export const loadUsersRequest = actionCreator(LOAD_USERS_REQUEST);

export interface LoadUsersSuccessAction extends Action {
  payload: User[];
}

export const loadUsersSuccess = actionCreator(LOAD_USERS_SUCCESS);

export interface LoadUsersFailureAction extends Action {
  payload: null;
}

export const loadUsersFailure = actionCreator(LOAD_USERS_FAILURE);


export interface CreateUserRequestAction extends Action {
  payload: UserCreateData;
}

export const createUserRequest = actionCreator(CREATE_USER_REQUEST);

export interface CreateUserSuccessAction extends Action {
  payload: User;
}

export const createUserSuccess = actionCreator(CREATE_USER_SUCCESS);

export interface CreateUserFailureAction extends Action {
  payload: null;
}

export const createUserFailure = actionCreator(CREATE_USER_FAILURE);

export interface DeleteUserRequestAction extends Action {
  payload: {
    userId: string;
  };
}

export const deleteUserRequest = actionCreator(DELETE_USER_REQUEST);

export interface DeleteUserSuccessAction extends Action {
  payload: {
    userId: string;
  };
}

export const deleteUserSuccess = actionCreator(DELETE_USER_SUCCESS);

export interface DeleteUserFailureAction extends Action {
  payload: null;
}

export const deleteUserFailure = actionCreator(DELETE_USER_FAILURE);