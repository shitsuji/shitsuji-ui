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
  DELETE_REPOSITORY_SUCCESS,
  CREATE_REPOSITORY_FAILURE,
  DELETE_REPOSITORY_FAILURE
} from '../actions';
import { exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import { REPOSITORIES_PATH } from '../constants';
import queryString from 'query-string';
import { Dependencies } from '../../models';
import { showError } from '../../helpers';

export function loadRepositoriesEpic(action$: Observable<Action>, store: Store, { history, axios }: Dependencies) {
  return action$.pipe(
    ofType(LOAD_REPOSITORIES_REQUEST),
    map((action: LoadRepositoriesRequestAction) => action.payload),
    exhaustMap(async ({ search }) => {
      const current = queryString.parse(history.location.search);
      let params;

      if ((search && search.length)) {
        history.push({
          search: queryString.stringify({ search })
        });

        params = { search };
      } else if (current.search) {
        history.push({});
      }

      try {
        const res = await axios.get('/repositories', { params });

        return loadRepositoriesSuccess(res.data);
      } catch (e) {
        return loadRepositoriesFailure(e);
      }
    })
  );
}

export function createRepositoryEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(CREATE_REPOSITORY_REQUEST),
    map((action: CreateRepositoryRequestAction) => action.payload),
    exhaustMap(async (payload) => {
      try {
        const res = await axios.post('/repositories', payload);

        return createRepositorySuccess(res.data);
      } catch (e) {
        return createRepositoryFailure(e);
      }
    })
  );
}

export function deleteRepositoryEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(DELETE_REPOSITORY_REQUEST),
    map((action: DeleteRepositoryRequestAction) => action.payload),
    exhaustMap(async ({ repositoryId }) => {
      try {
        await axios.delete(`/repositories/${repositoryId}`);

        return deleteRepositorySuccess({ repositoryId });
      } catch (e) {
        return deleteRepositoryFailure(e);
      }
    })
  );
}

export function navigateToRepositoriesOnSuccessEpic(action$: Observable<Action>, store: Store, { history }: Dependencies) {
  return action$.pipe(
    ofType(CREATE_REPOSITORY_SUCCESS, DELETE_REPOSITORY_SUCCESS),
    tap(() => {
      history.push(REPOSITORIES_PATH);
    }),
    ignoreElements()
  );
}

export function createRepositoryToastEpic(action$: Observable<Action>, store: Store) {
  return action$.pipe(
    ofType(CREATE_REPOSITORY_FAILURE),
    tap(() => showError('Error while creating repository')),
    ignoreElements()
  );
}

export function deleteRepositoryToastEpic(action$: Observable<Action>, store: Store) {
  return action$.pipe(
    ofType(DELETE_REPOSITORY_FAILURE),
    tap(() => showError('Error while deleting repository')),
    ignoreElements()
  );
}