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
  CreateVersionSuccessAction
} from '../actions';
import { catchError, exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import { ajax } from 'rxjs/observable/dom/ajax';
import { of } from 'rxjs/observable/of';
import { BASE_URL } from '../../constants';
import { APPLICATIONS_PATH } from '../constants';
import { History } from 'history';

export function createVersionEpic(action$: Observable<Action>, store: Store, deps: {}) {
  return action$.pipe(
    ofType(CREATE_VERSION_REQUEST),
    map((action: CreateVersionRequestAction) => action.payload),
    exhaustMap((payload) => ajax.post(`${BASE_URL}/applications/${payload.applicationId}/versions`, payload.version).pipe(
      map((res) => createVersionSuccess({
        version: res.response,
        applicationId: payload.applicationId
      })),
      catchError((err) => of(createVersionFailure(err)))
    ))
  );
}

export function navigateToVersionsOnCreateEpic(action$: Observable<Action>, store: Store, { history }: { history: History }) {
  return action$.pipe(
    ofType(CREATE_VERSION_SUCCESS),
    tap((action: CreateVersionSuccessAction) => {
      history.push(`${APPLICATIONS_PATH}/${action.payload.applicationId}`);
    }),
    ignoreElements()
  );
}