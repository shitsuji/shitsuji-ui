// @flow
import { USERS_INITIAL_STATE } from '../constants';
import { reducer, getRidAsId } from '../../helpers';
import {
  LOAD_USERS_REQUEST,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  CREATE_USER_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DeleteUserSuccessAction,
  DELETE_USER_FAILURE,
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
  [DELETE_USER_REQUEST]: (state) => ({
    ...state,
    pending: true
  }),
  [DELETE_USER_SUCCESS]: (state, { payload }: DeleteUserSuccessAction) => {
    if (!state.users || !state.users.length) {
      return state;
    }

    const users = state.users.filter((u) => getRidAsId(u) !== payload.userId);
    return {
      ...state,
      users,
      pending: false
    };
  },
  [DELETE_USER_FAILURE]: (state) => ({
    ...state,
    pending: false
  }),
});
