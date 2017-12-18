import { APPLICATIONS_INITIAL_STATE } from '../constants';
import { reducer } from '../../helpers';
import { LOAD_APPLICATIONS_REQUEST, LOAD_APPLICATIONS_SUCCESS, LOAD_APPLICATIONS_FAILURE } from '../actions';

export const applicationsReducer = reducer(APPLICATIONS_INITIAL_STATE, {
  [LOAD_APPLICATIONS_REQUEST]: (state, action) => ({
    ...state,
    pending: true
  }),
  [LOAD_APPLICATIONS_SUCCESS]: (state, { payload }) => ({
    ...state,
    applications: payload,
    pending: false
  }),
  [LOAD_APPLICATIONS_FAILURE]: (state) => ({
    ...state,
    pending: false
  }),
});
