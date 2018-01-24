// @flow
import { USERS_INITIAL_STATE } from '../constants';
import { reducer } from '../../helpers';
import {
  LOAD_USERS_REQUEST,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  CREATE_USER_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS
} from '../actions';

export const usersReducer = reducer(USERS_INITIAL_STATE, {
  [LOAD_USERS_REQUEST]: (state, action) => ({
    ...state,
    pending: true
  }),
  [LOAD_USERS_SUCCESS]: (state, { payload }) => ({
    ...state,
    users: payload,
    pending: false
  }),
  [LOAD_USERS_FAILURE]: (state) => ({
    ...state,
    pending: false
  }),
  [CREATE_USER_REQUEST]: (state, { payload }) => ({
    ...state,
    pending: true
  }),
  [CREATE_USER_SUCCESS]: (state, { payload }) => ({
    ...state,
    users: (state.users || []).concat(payload),
    pending: false
  }),
  [CREATE_USER_FAILURE]: (state, { payload }) => ({
    ...state,
    pending: false
  }),
});
