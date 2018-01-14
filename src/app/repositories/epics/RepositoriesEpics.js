// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import {
  LOAD_REPOSITORIES_REQUEST,
  LoadRepositoriesRequestAction,
  loadRepositoriesSuccess,
  loadRepositoriesFailure,
  CREATE_REPOSITORY_REQUEST,
  CreateRepositoryRequestAction,
  createRepositorySuccess,
  createRepositoryFailure,
  DELETE_REPOSITORY_REQUEST,
  DeleteRepositoryRequestAction,
  deleteRepositorySuccess,
  deleteRepositoryFailure,
  CREATE_REPOSITORY_SUCCESS,
  DELETE_REPOSITORY_SUCCESS
} from '../actions';
import { catchError, exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import { ajax } from 'rxjs/observable/dom/ajax';
import { of } from 'rxjs/observable/of';
import { BASE_URL } from '../../constants';
import { REPOSITORIES_PATH } from '../constants';
import { History } from 'history';
import queryString from 'query-string';

export function loadRepositoriesEpic(action$: Observable<Action>, store: Store, { history }: { history: History }) {
  return action$.pipe(
    ofType(LOAD_REPOSITORIES_REQUEST),
    map((action: LoadRepositoriesRequestAction) => action.payload),
    exhaustMap(({ search }) => {
      const current = queryString.parse(history.location.search);
      if ((search && search.length) || current.search) {
        history.push({
          search: queryString.stringify({ search })
        });
      }

      return ajax.getJSON(`${BASE_URL}/repositories${search ? '?search=' +  search : ''}`).pipe(
        map((res) => loadRepositoriesSuccess(res)),
        catchError((err) => of(loadRepositoriesFailure(err)))
      );
    })
  );
}

export function createRepositoryEpic(action$: Observable<Action>, store: Store, deps: {}) {
  return action$.pipe(
    ofType(CREATE_REPOSITORY_REQUEST),
    map((action: CreateRepositoryRequestAction) => action.payload),
    exhaustMap((payload) => ajax.post(`${BASE_URL}/repositories`, payload).pipe(
      map((res) => createRepositorySuccess(res.response)),
      catchError((err) => of(createRepositoryFailure(err)))
    ))
  );
}

export function deleteRepositoryEpic(action$: Observable<Action>, store: Store, deps: {}) {
  return action$.pipe(
    ofType(DELETE_REPOSITORY_REQUEST),
    map((action: DeleteRepositoryRequestAction) => action.payload),
    exhaustMap(({ repositoryId }) => ajax.delete(`${BASE_URL}/repositories/${repositoryId}`).pipe(
      map(() => deleteRepositorySuccess({ repositoryId })),
      catchError((err) => of(deleteRepositoryFailure(err)))
    ))
  );
}

export function navigateToRepositoriesOnSuccessEpic(action$: Observable<Action>, store: Store, { history }: { history: History }) {
  return action$.pipe(
    ofType(CREATE_REPOSITORY_SUCCESS, DELETE_REPOSITORY_SUCCESS),
    tap(() => {
      history.push(REPOSITORIES_PATH);
    }),
    ignoreElements()
  );
}
