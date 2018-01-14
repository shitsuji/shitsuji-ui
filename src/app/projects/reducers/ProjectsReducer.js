// @flow
import { PROJECTS_INITIAL_STATE } from '../constants';
import { reducer } from '../../helpers';
import {
  LOAD_PROJECTS_REQUEST,
  LOAD_PROJECTS_SUCCESS,
  LOAD_PROJECTS_FAILURE,
  CREATE_PROJECT_FAILURE,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS
} from '../actions';

export const projectsReducer = reducer(PROJECTS_INITIAL_STATE, {
  [LOAD_PROJECTS_REQUEST]: (state, action) => ({
    ...state,
    pending: true
  }),
  [LOAD_PROJECTS_SUCCESS]: (state, { payload }) => ({
    ...state,
    projects: payload,
    pending: false
  }),
  [LOAD_PROJECTS_FAILURE]: (state) => ({
    ...state,
    pending: false
  }),
  [CREATE_PROJECT_REQUEST]: (state, { payload }) => ({
    ...state,
    pending: true
  }),
  [CREATE_PROJECT_SUCCESS]: (state, { payload }) => ({
    ...state,
    projects: (state.projects || []).concat(payload),
    pending: false
  }),
  [CREATE_PROJECT_FAILURE]: (state, { payload }) => ({
    ...state,
    pending: false
  }),
});
