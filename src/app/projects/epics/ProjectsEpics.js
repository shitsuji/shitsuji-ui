// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import {
  LOAD_PROJECTS_REQUEST,
  LoadProjectsRequestAction,
  loadProjectsSuccess,
  loadProjectsFailure,
  CREATE_PROJECT_REQUEST,
  CreateProjectRequestAction,
  createProjectSuccess,
  createProjectFailure,
  DELETE_PROJECT_REQUEST,
  DeleteProjectRequestAction,
  deleteProjectSuccess,
  deleteProjectFailure,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_SUCCESS
} from '../actions';
import { catchError, exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import { ajax } from 'rxjs/observable/dom/ajax';
import { of } from 'rxjs/observable/of';
import { BASE_URL } from '../../constants';
import { PROJECTS_PATH } from '../constants';
import { History } from 'history';
import queryString from 'query-string';

export function loadProjectsEpic(action$: Observable<Action>, store: Store, { history }: { history: History }) {
  return action$.pipe(
    ofType(LOAD_PROJECTS_REQUEST),
    map((action: LoadProjectsRequestAction) => action.payload),
    exhaustMap(({ search }) => {
      const current = queryString.parse(history.location.search);
      if ((search && search.length) || current.search) {
        history.push({
          search: queryString.stringify({ search })
        });
      }

      return ajax.getJSON(`${BASE_URL}/projects${search ? '?search=' +  search : ''}`).pipe(
        map((res) => loadProjectsSuccess(res)),
        catchError((err) => of(loadProjectsFailure(err)))
      );
    })
  );
}

export function createProjectEpic(action$: Observable<Action>, store: Store, deps: {}) {
  return action$.pipe(
    ofType(CREATE_PROJECT_REQUEST),
    map((action: CreateProjectRequestAction) => action.payload),
    exhaustMap((payload) => ajax.post(`${BASE_URL}/projects`, payload).pipe(
      map((res) => createProjectSuccess(res.response)),
      catchError((err) => of(createProjectFailure(err)))
    ))
  );
}

export function deleteProjectEpic(action$: Observable<Action>, store: Store, deps: {}) {
  return action$.pipe(
    ofType(DELETE_PROJECT_REQUEST),
    map((action: DeleteProjectRequestAction) => action.payload),
    exhaustMap(({ projectId }) => ajax.delete(`${BASE_URL}/projects/${projectId}`).pipe(
      map(() => deleteProjectSuccess({ projectId })),
      catchError((err) => of(deleteProjectFailure(err)))
    ))
  );
}

export function navigateToProjectsOnSuccessEpic(action$: Observable<Action>, store: Store, { history }: { history: History }) {
  return action$.pipe(
    ofType(CREATE_PROJECT_SUCCESS, DELETE_PROJECT_SUCCESS),
    tap(() => {
      history.push(PROJECTS_PATH);
    }),
    ignoreElements()
  );
}
