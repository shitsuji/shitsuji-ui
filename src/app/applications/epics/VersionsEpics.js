// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import {
  CREATE_VERSION_SUCCESS,
  CREATE_VERSION_REQUEST,
  CreateVersionRequestAction,
  createVersionSuccess,
  createVersionFailure,
  CreateVersionSuccessAction,
  DELETE_VERSION_REQUEST,
  DeleteVersionRequestAction,
  deleteVersionSuccess,
  deleteVersionFailure,
  DeleteVersionSuccessAction,
  CREATE_VERSION_FAILURE,
  DELETE_VERSION_FAILURE
} from '../actions';
import { exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import { APPLICATIONS_PATH } from '../constants';
import { Dependencies } from '../../models';
import { showError, getRidAsId } from '../../helpers';

export function createVersionEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(CREATE_VERSION_REQUEST),
    map((action: CreateVersionRequestAction) => action.payload),
    exhaustMap(async ({ applicationId, version, dependencies }) => {
      try {
        const res = await axios.post(`/applications/${applicationId}/versions`, version);
        const versionId = getRidAsId(res.data);

        const dependees = await axios.put(`/versions/${versionId}/dependees`, dependencies);

        return createVersionSuccess({
          version: res.data,
          dependees: dependees.data,
          applicationId
        });
      } catch (e) {
        return createVersionFailure(e);
      }
    })
  );
}

export function deleteVersionEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(DELETE_VERSION_REQUEST),
    map((action: DeleteVersionRequestAction) => action.payload),
    exhaustMap(async ({ versionId, applicationId }) => {
      try {
        await axios.delete(`/versions/${versionId}`);

        return deleteVersionSuccess({ versionId, applicationId });
      } catch (e) {
        return deleteVersionFailure(e);
      }
    })
  );
}

export function navigateToVersionsOnSuccessEpic(action$: Observable<Action>, store: Store, { history }: Dependencies) {
  return action$.pipe(
    ofType(CREATE_VERSION_SUCCESS),
    map((action: CreateVersionSuccessAction | DeleteVersionSuccessAction) => action.payload.applicationId),
    tap((applicationId) => {
      history.push(`${APPLICATIONS_PATH}/${applicationId}`);
    }),
    ignoreElements()
  );
}

export function createVersionToastEpic(action$: Observable<Action>, store: Store) {
  return action$.pipe(
    ofType(CREATE_VERSION_FAILURE),
    tap(() => showError('Error while creating version')),
    ignoreElements()
  );
}

export function deleteVersionToastEpic(action$: Observable<Action>, store: Store) {
  return action$.pipe(
    ofType(DELETE_VERSION_FAILURE),
    tap(() => showError('Error while deleting version')),
    ignoreElements()
  );
}