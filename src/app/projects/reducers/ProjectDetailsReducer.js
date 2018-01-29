// @flow
import { PROJECT_DETAILS_INITIAL_STATE } from '../constants';
import { reducer, getRidAsId } from '../../helpers';
import { 
  LOAD_PROJECT_DETAILS_REQUEST,
  LOAD_PROJECT_DETAILS_SUCCESS,
  LOAD_PROJECT_DETAILS_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DeleteProjectSuccessAction,
  DELETE_PROJECT_FAILURE,
  EDIT_PROJECT_REQUEST,
  EDIT_PROJECT_SUCCESS,
  EditProjectSuccessAction,
  EDIT_PROJECT_FAILURE
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
  }),
  [DELETE_PROJECT_REQUEST]: (state) => ({
    ...state,
    pending: true
  }),
  [DELETE_PROJECT_SUCCESS]: (state: ProjectDetailsState, { payload }: DeleteProjectSuccessAction) => {
    if (!state.project || getRidAsId(state.project) !== payload.projectId) {
      return {
        ...state,
        pending: false
      };
    }
  
    return PROJECT_DETAILS_INITIAL_STATE;
  },
  [DELETE_PROJECT_FAILURE]: (state) => ({
    ...state,
    pending: false
  }),
  [EDIT_PROJECT_REQUEST]: (state) => ({
    ...state,
    pending: true
  }),
  [EDIT_PROJECT_SUCCESS]: (state: ProjectDetailsState, { payload }: EditProjectSuccessAction) => {
    const { project, applications } = payload;

    const projectId = getRidAsId(project);
    if (!state.project || getRidAsId(state.project) !== projectId) {
      return {
        ...state,
        pending: false
      };
    }

    return {
      ...state,
      project,
      applications,
      pending: false
    };
  },
  [EDIT_PROJECT_FAILURE]: (state) => ({
    ...state,
    pending: false
  })
});