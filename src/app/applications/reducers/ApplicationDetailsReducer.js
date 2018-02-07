// @flow
import { APPLICATION_DETAILS_INITIAL_STATE } from '../constants';
import { reducer } from '../../helpers';
import { 
  LOAD_APPLICATION_DETAILS_REQUEST,
  LOAD_APPLICATION_DETAILS_SUCCESS,
  LOAD_APPLICATION_DETAILS_FAILURE,
  SELECT_VERSION_REQUEST,
  SELECT_VERSION_SUCCESS,
  SELECT_VERSION_FAILURE,
  CREATE_VERSION_SUCCESS,
  CreateVersionSuccessAction,
  DELETE_APPLICATION_REQUEST,
  DELETE_APPLICATION_SUCCESS,
  DELETE_APPLICATION_FAILURE,
  DELETE_VERSION_REQUEST,
  DELETE_VERSION_SUCCESS,
  DELETE_VERSION_FAILURE,
  DeleteVersionSuccessAction,
  DeleteApplicationSuccessAction,
  EDIT_APPLICATION_REQUEST,
  EDIT_APPLICATION_SUCCESS,
  EditApplicationSuccessAction,
  EDIT_APPLICATION_FAILURE,
  EDIT_VERSION_REQUEST,
  EDIT_VERSION_SUCCESS,
  EditVersionSuccessAction,
  EDIT_VERSION_FAILURE
} from '../actions';
import { ApplicationDetailsState } from '../models';
import { getRidAsId } from '../../helpers';

export const applicationDetailsReducer = reducer(APPLICATION_DETAILS_INITIAL_STATE, {
  [LOAD_APPLICATION_DETAILS_REQUEST]: (state) => ({
    ...state,
    pending: true
  }),
  [LOAD_APPLICATION_DETAILS_SUCCESS]: (state, { payload }) => ({
    ...state,
    ...payload,
    pending: false,
    // selectedVersionId: payload.versions && payload.versions.length ?
    //   getRidAsId(payload.versions[0]) :
    //   null
  }),
  [LOAD_APPLICATION_DETAILS_FAILURE]: (state) => ({
    ...state,
    pending: false
  }),
  [SELECT_VERSION_REQUEST]: (state, { payload }) => ({
    ...state,
    pending: true,
    selectedVersionId: getRidAsId(payload)
  }),
  [SELECT_VERSION_SUCCESS]: (state, { payload }) => ({
    ...state,
    ...payload,
    pending: false,
  }),
  [SELECT_VERSION_FAILURE]: (state, { payload }) => ({
    ...state,
    pending: false
  }),
  [CREATE_VERSION_SUCCESS]: (state: ApplicationDetailsState, { payload }: CreateVersionSuccessAction) => {
    if (!state.application || !state.versions || getRidAsId(state.application) !== payload.applicationId) {
      return {
        ...state,
        pending: false
      };
    }

    const versions = [...state.versions, payload.version];
    const versionId = getRidAsId(payload.version);
    let dependees = state.dependees;
    if (versionId === state.selectedVersionId) {
      dependees = payload.dependees;
    }

    return {
      ...state,
      versions,
      dependees
    };
  },
  [DELETE_APPLICATION_REQUEST]: (state) => ({
    ...state,
    pending: true
  }),
  [DELETE_APPLICATION_SUCCESS]: (state: ApplicationDetailsState, { payload }: DeleteApplicationSuccessAction) => {
    if (!state.application || getRidAsId(state.application) !== payload.applicationId) {
      return {
        ...state,
        pending: false
      };
    }
  
    return APPLICATION_DETAILS_INITIAL_STATE;
  },
  [DELETE_APPLICATION_FAILURE]: (state) => ({
    ...state,
    pending: false
  }),
  [DELETE_VERSION_REQUEST]: (state) => ({
    ...state,
    pending: true
  }),
  [DELETE_VERSION_SUCCESS]: (state: ApplicationDetailsState, { payload }: DeleteVersionSuccessAction) => {
    if (!state.application || !state.versions || getRidAsId(state.application) !== payload.applicationId) {
      return {
        ...state,
        pending: false
      };
    }

    const versions = state.versions.filter((v) => getRidAsId(v) !== payload.versionId);
    return {
      ...state,
      pending: false,
      versions
    };
  },
  [DELETE_VERSION_FAILURE]: (state) => ({
    ...state,
    pending: false
  }),
  [EDIT_APPLICATION_REQUEST]: (state) => ({
    ...state,
    pending: true
  }),
  [EDIT_APPLICATION_SUCCESS]: (state: ApplicationDetailsState, { payload }: EditApplicationSuccessAction) => {
    const applicationId = getRidAsId(payload);
    if (!state.application || getRidAsId(state.application) !== applicationId) {
      return {
        ...state,
        pending: false
      };
    }

    return {
      ...state,
      application: payload,
      pending: false
    };
  },
  [EDIT_APPLICATION_FAILURE]: (state) => ({
    ...state,
    pending: false
  }),
  [EDIT_VERSION_REQUEST]: (state) => ({
    ...state,
    pending: true
  }),
  [EDIT_VERSION_SUCCESS]: (state: ApplicationDetailsState, { payload }: EditVersionSuccessAction) => {
    if (!state.application || !state.versions || getRidAsId(state.application) !== payload.applicationId) {
      return {
        ...state,
        pending: false
      };
    }
    
    const versionId = getRidAsId(payload.version);
    const versions = state.versions && state.versions.map((v) => getRidAsId(v) === versionId ? payload.version : v);
    let dependees = state.dependees;
    if (versionId === state.selectedVersionId) {
      dependees = payload.dependees;
    }

    return {
      ...state,
      versions,
      dependees,
      pending: false
    };
  },
  [EDIT_VERSION_FAILURE]: (state) => ({
    ...state,
    pending: false
  })
});