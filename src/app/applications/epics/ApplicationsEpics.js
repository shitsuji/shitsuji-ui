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
  createApplicationFailure
} from '../actions';
import { catchError, exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import { ajax } from 'rxjs/observable/dom/ajax';
import { of } from 'rxjs/observable/of';
import { BASE_URL } from '../../constants';
import { CREATE_APPLICATION_SUCCESS, APPLICATIONS_PATH } from '../index';
import { History } from 'history';
import queryString from 'query-string';

export function loadApplicationsEpic(action$: Observable<Action>, store: Store, { history }: { history: History }) {
  return action$.pipe(
    ofType(LOAD_APPLICATIONS_REQUEST),
    map((action: LoadApplicationsRequestAction) => action.payload),
    exhaustMap(({ search }) => {
      history.push({
        search: queryString.stringify({ search })
      });

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
      map((res) => createApplicationSuccess(res)),
      catchError((err) => of(createApplicationFailure(err)))
    ))
  );
}

export function navigateToApplicationsOnCreateEpic(action$: Observable<Action>, store: Store, { history }: { history: History }) {
  return action$.pipe(
    ofType(CREATE_APPLICATION_SUCCESS),
    tap(() => {
      history.push(APPLICATIONS_PATH);
    }),
    ignoreElements()
  )
}