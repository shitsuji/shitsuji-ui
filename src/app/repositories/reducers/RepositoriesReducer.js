// @flow
import { REPOSITORIES_INITIAL_STATE } from '../constants';
import { reducer } from '../../helpers';
import {
  LOAD_REPOSITORIES_REQUEST,
  LOAD_REPOSITORIES_SUCCESS,
  LOAD_REPOSITORIES_FAILURE,
  CREATE_REPOSITORY_FAILURE,
  CREATE_REPOSITORY_REQUEST,
  CREATE_REPOSITORY_SUCCESS
} from '../actions';

export const repositoriesReducer = reducer(REPOSITORIES_INITIAL_STATE, {
  [LOAD_REPOSITORIES_REQUEST]: (state, action) => ({
    ...state,
    pending: true
  }),
  [LOAD_REPOSITORIES_SUCCESS]: (state, { payload }) => ({
    ...state,
    repositories: payload,
    pending: false
  }),
  [LOAD_REPOSITORIES_FAILURE]: (state) => ({
    ...state,
    pending: false
  }),
  [CREATE_REPOSITORY_REQUEST]: (state, { payload }) => ({
    ...state,
    pending: true
  }),
  [CREATE_REPOSITORY_SUCCESS]: (state, { payload }) => ({
    ...state,
    repositories: (state.repositories || []).concat(payload),
    pending: false
  }),
  [CREATE_REPOSITORY_FAILURE]: (state, { payload }) => ({
    ...state,
    pending: false
  }),
});
