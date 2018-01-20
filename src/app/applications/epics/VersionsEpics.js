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
  DeleteVersionSuccessAction
} from '../actions';
import { exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import { APPLICATIONS_PATH } from '../constants';
import { Dependencies } from '../../models';

export function createVersionEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(CREATE_VERSION_REQUEST),
    map((action: CreateVersionRequestAction) => action.payload),
    exhaustMap(async ({ applicationId, version }) => {
      try {
        const res = await axios.post(`/applications/${applicationId}/versions`, version);

        return createVersionSuccess({
          version: res.data,
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