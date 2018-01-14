// @flow
import { PROJECT_DETAILS_INITIAL_STATE } from '../constants';
import { reducer } from '../../helpers';
import { 
  LOAD_PROJECT_DETAILS_REQUEST,
  LOAD_PROJECT_DETAILS_SUCCESS,
  LOAD_PROJECT_DETAILS_FAILURE
} from '../actions';
import { ProjectDetailsState } from '../models';

export const projectDetailsReducer = reducer(PROJECT_DETAILS_INITIAL_STATE, {
  [LOAD_PROJECT_DETAILS_REQUEST]: (state: ProjectDetailsState) => ({
    ...state,
    pending: true
  }),
  [LOAD_PROJECT_DETAILS_SUCCESS]: (state: ProjectDetailsState, { payload }) => ({
    ...state,
    ...payload,
    pending: false
  }),
  [LOAD_PROJECT_DETAILS_FAILURE]: (state: ProjectDetailsState) => ({
    ...state,
    pending: false
  })
});