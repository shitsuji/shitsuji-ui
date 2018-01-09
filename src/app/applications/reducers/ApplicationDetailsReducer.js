// @flow
import { APPLICATION_DETAILS_INITIAL_STATE } from '../constants';
import { reducer } from '../../helpers';
import { 
  LOAD_APPLICATION_DETAILS_REQUEST,
  LOAD_APPLICATION_DETAILS_SUCCESS,
  LOAD_APPLICATION_DETAILS_FAILURE
} from '../actions';

export const applicationDetailsReducer = reducer(APPLICATION_DETAILS_INITIAL_STATE, {
  [LOAD_APPLICATION_DETAILS_REQUEST]: (state) => ({
    ...state,
    pending: true
  }),
  [LOAD_APPLICATION_DETAILS_SUCCESS]: (state, { payload }) => ({
    ...state,
    ...payload,
    pending: false
  }),
  [LOAD_APPLICATION_DETAILS_FAILURE]: (state) => ({
    ...state,
    pending: false
  }),
});