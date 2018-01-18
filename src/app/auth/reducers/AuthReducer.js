// @flow
import { AUTH_INITIAL_STATE } from '../constants';
import { AuthState } from '../models';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILURE,
  LOGOUT_REQUEST
} from '../actions';
import { AnyAction } from 'redux';

export function authReducer(state: AuthState = AUTH_INITIAL_STATE, { type, payload }: AnyAction): AuthState {
  switch (type) {
  case TOKEN_REQUEST:
  case LOGIN_REQUEST: {
    return {
      ...state,
      pending: true
    };
  }
  case TOKEN_SUCCESS:
  case LOGIN_SUCCESS: {
    return {
      ...state,
      ...payload,
      pending: false,
    };
  }
  case TOKEN_FAILURE:
  case LOGIN_FAILURE: {
    return {
      ...state,
      pending: false,
    };
  }
  case LOGOUT_REQUEST: {
    return {
      ...AUTH_INITIAL_STATE,
      token: null,
      pending: false
    };
  }
  default: {
    return state;
  }
  }
}