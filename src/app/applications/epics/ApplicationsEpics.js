// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import {
  LOAD_APPLICATIONS_REQUEST,
  LoadApplicationsRequestAction,
  loadApplicationsSuccess,
  loadApplicationsFailure,
  CREATE_APPLICATION_REQUEST,
  CreateApplicationRequestAction,
  createApplicationSuccess,
  createApplicationFailure,
  CREATE_APPLICATION_SUCCESS,
  DELETE_APPLICATION_SUCCESS,
  DELETE_APPLICATION_REQUEST,
  deleteApplicationFailure,
  deleteApplicationSuccess,
  DeleteApplicationRequestAction
} from '../actions';
import { catchError, exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import { ajax } from 'rxjs/observable/dom/ajax';
import { of } from 'rxjs/observable/of';
import { BASE_URL } from '../../constants';
import { APPLICATIONS_PATH } from '../constants';
import { History } from 'history';
import queryString from 'query-string';

export function loadApplicationsEpic(action$: Observable<Action>, store: Store, { history }: { history: History }) {
  return action$.pipe(
    ofType(LOAD_APPLICATIONS_REQUEST),
    map((action: LoadApplicationsRequestAction) => action.payload),
    exhaustMap(({ search }) => {
      const current = queryString.parse(history.location.search);
      if ((search && search.length) || current.search) {
        history.push({
          search: queryString.stringify({ search })
        });
      }

      return ajax.getJSON(`${BASE_URL}/applications${search ? '?search=' +  search : ''}`).pipe(
        map((res) => loadApplicationsSuccess(res)),
        catchError((err) => of(loadApplicationsFailure(err)))
      );
    })
  );
}

export function createApplicationEpic(action$: Observable<Action>, store: Store, deps: {}) {
  return action$.pipe(
    ofType(CREATE_APPLICATION_REQUEST),
    map((action: CreateApplicationRequestAction) => action.payload),
    exhaustMap((payload) => ajax.post(`${BASE_URL}/applications`, payload).pipe(
      map((res) => createApplicationSuccess(res.response)),
      catchError((err) => of(createApplicationFailure(err)))
    ))
  );
}

export function deleteApplicationEpic(action$: Observable<Action>, store: Store, deps: {}) {
  return action$.pipe(
    ofType(DELETE_APPLICATION_REQUEST),
    map((action: DeleteApplicationRequestAction) => action.payload),
    exhaustMap(({ applicationId }) => ajax.delete(`${BASE_URL}/applications/${applicationId}`).pipe(
      map(() => deleteApplicationSuccess({ applicationId })),
      catchError((err) => of(deleteApplicationFailure(err)))
    ))
  );
}

export function navigateToApplicationsOnSuccessEpic(action$: Observable<Action>, store: Store, { history }: { history: History }) {
  return action$.pipe(
    ofType(CREATE_APPLICATION_SUCCESS, DELETE_APPLICATION_SUCCESS),
    tap(() => {
      history.push(APPLICATIONS_PATH);
    }),
    ignoreElements()
  );
}
