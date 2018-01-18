// @flow
import { Action } from 'redux';
import { actionCreator } from '../../helpers';
import { LoginCredentials, AuthResponse } from '../models';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAILURE = 'TOKEN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export interface LoginRequestAction extends Action {
  payload: LoginCredentials;
}

export const loginRequest = actionCreator(LOGIN_REQUEST);

export interface LoginSuccessAction extends Action {
  payload: AuthResponse;
}

export const loginSuccess = actionCreator(LOGIN_SUCCESS);

export interface LoginFailureAction extends Action {
  payload: null;
}

export const loginFailure = actionCreator(LOGIN_FAILURE);

export interface TokenRequestAction extends Action {
  payload: { token: string };
}

export const tokenRequest = actionCreator(TOKEN_REQUEST);

export interface TokenSuccessAction extends Action {
  payload: AuthResponse;
}

export const tokenSuccess = actionCreator(TOKEN_SUCCESS);

export interface TokenFailureAction extends Action {
  payload: null;
}

export const tokenFailure = actionCreator(TOKEN_FAILURE);

export interface LogoutRequestAction extends Action {
  payload: null;
}

export const logoutRequest = actionCreator(LOGOUT_REQUEST);