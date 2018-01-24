// @flow
import { Action } from 'redux';
import { actionCreator } from '../../helpers';
import { User } from '../models';

export const LOAD_USER_DETAILS_REQUEST = 'LOAD_USER_DETAILS_REQUEST';
export const LOAD_USER_DETAILS_SUCCESS = 'LOAD_USER_DETAILS_SUCCESS';
export const LOAD_USER_DETAILS_FAILURE = 'LOAD_USER_DETAILS_FAILURE';

export interface LoadUserDeatilsRequestAction extends Action {
  payload: { userId: string };
}

export const loadUserDeatilsRequest = actionCreator(LOAD_USER_DETAILS_REQUEST);

export interface LoadUserDeatilsSuccessAction extends Action {
  payload: {
    user: User;
  };
}

export const loadUserDeatilsSuccess = actionCreator(LOAD_USER_DETAILS_SUCCESS);

export interface LoadUserDeatilsFailureAction extends Action {
  payload: null;
}

export const loadUserDeatilsFailure = actionCreator(LOAD_USER_DETAILS_FAILURE);
