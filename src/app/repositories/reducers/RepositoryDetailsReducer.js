// @flow
import { REPOSITORY_DETAILS_INITIAL_STATE } from '../constants';
import { reducer, getRidAsId } from '../../helpers';
import { 
  LOAD_REPOSITORY_DETAILS_REQUEST,
  LOAD_REPOSITORY_DETAILS_SUCCESS,
  LOAD_REPOSITORY_DETAILS_FAILURE,
  DELETE_REPOSITORY_REQUEST,
  DELETE_REPOSITORY_SUCCESS,
  DeleteRepositorySuccessAction,
  DELETE_REPOSITORY_FAILURE,
  EDIT_REPOSITORY_REQUEST,
  EDIT_REPOSITORY_SUCCESS,
  EditRepositorySuccessAction,
  EDIT_REPOSITORY_FAILURE
} from '../actions';
import { RepositoryDetailsState } from '../models';

export const repositoryDetailsReducer = reducer(REPOSITORY_DETAILS_INITIAL_STATE, {
  [LOAD_REPOSITORY_DETAILS_REQUEST]: (state: RepositoryDetailsState) => ({
    ...state,
    pending: true
  }),
  [LOAD_REPOSITORY_DETAILS_SUCCESS]: (state: RepositoryDetailsState, { payload }) => ({
    ...state,
    ...payload,
    pending: false
  }),
  [LOAD_REPOSITORY_DETAILS_FAILURE]: (state: RepositoryDetailsState) => ({
    ...state,
    pending: false
  }),
  [DELETE_REPOSITORY_REQUEST]: (state) => ({
    ...state,
    pending: true
  }),
  [DELETE_REPOSITORY_SUCCESS]: (state: RepositoryDetailsState, { payload }: DeleteRepositorySuccessAction) => {
    if (!state.repository || getRidAsId(state.repository) !== payload.repositoryId) {
      return {
        ...state,
        pending: false
      };
    }
  
    return REPOSITORY_DETAILS_INITIAL_STATE;
  },
  [DELETE_REPOSITORY_FAILURE]: (state) => ({
    ...state,
    pending: false
  }),
  [EDIT_REPOSITORY_REQUEST]: (state) => ({
    ...state,
    pending: true
  }),
  [EDIT_REPOSITORY_SUCCESS]: (state: RepositoryDetailsState, { payload }: EditRepositorySuccessAction) => {
    const repositoryId = getRidAsId(payload);
    if (!state.repository || getRidAsId(state.repository) !== repositoryId) {
      return {
        ...state,
        pending: false
      };
    }

    return {
      ...state,
      repository: payload,
      pending: false
    };
  },
  [EDIT_REPOSITORY_FAILURE]: (state) => ({
    ...state,
    pending: false
  })
});