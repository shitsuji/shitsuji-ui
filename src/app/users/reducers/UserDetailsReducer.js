// @flow
import { USER_DETAILS_INITIAL_STATE } from '../constants';
import { reducer, getRidAsId } from '../../helpers';
import { 
  LOAD_USER_DETAILS_REQUEST,
  LOAD_USER_DETAILS_SUCCESS,
  LOAD_USER_DETAILS_FAILURE,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EditUserSuccessAction,
  EDIT_USER_FAILURE
} from '../actions';
import { UserDetailsState } from '../models';

export const userDetailsReducer = reducer(USER_DETAILS_INITIAL_STATE, {
  [LOAD_USER_DETAILS_REQUEST]: (state: UserDetailsState) => ({
    ...state,
    pending: true
  }),
  [LOAD_USER_DETAILS_SUCCESS]: (state: UserDetailsState, { payload }) => ({
    ...state,
    ...payload,
    pending: false
  }),
  [LOAD_USER_DETAILS_FAILURE]: (state: UserDetailsState) => ({
    ...state,
    pending: false
  }),
  [EDIT_USER_REQUEST]: (state) => ({
    ...state,
    pending: true
  }),
  [EDIT_USER_SUCCESS]: (state: UserDetailsState, { payload }: EditUserSuccessAction) => {
    const userId = getRidAsId(payload);
    if (!state.user || getRidAsId(state.user) !== userId) {
      return {
        ...state,
        pending: false
      };
    }

    return {
      ...state,
      user: payload,
      pending: false
    };
  },
  [EDIT_USER_FAILURE]: (state) => ({
    ...state,
    pending: false
  })
});