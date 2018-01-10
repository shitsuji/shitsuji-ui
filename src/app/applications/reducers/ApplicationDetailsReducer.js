// @flow
import { APPLICATION_DETAILS_INITIAL_STATE } from '../constants';
import { reducer } from '../../helpers';
import { 
  LOAD_APPLICATION_DETAILS_REQUEST,
  LOAD_APPLICATION_DETAILS_SUCCESS,
  LOAD_APPLICATION_DETAILS_FAILURE,
  SELECT_VERSION
} from '../actions';

export const applicationDetailsReducer = reducer(APPLICATION_DETAILS_INITIAL_STATE, {
  [LOAD_APPLICATION_DETAILS_REQUEST]: (state) => ({
    ...state,
    pending: true
  }),
  [LOAD_APPLICATION_DETAILS_SUCCESS]: (state, { payload }) => ({
    ...state,
    ...payload,
    pending: false,
    selectedVersion: payload.versions && payload.versions.length ? payload.versions[0] : null
  }),
  [LOAD_APPLICATION_DETAILS_FAILURE]: (state) => ({
    ...state,
    pending: false
  }),
  [SELECT_VERSION]: (state, { payload }) => ({
    ...state,
    selectedVersion: payload
  })
});