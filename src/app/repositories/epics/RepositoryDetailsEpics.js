// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ajax } from 'rxjs/observable/dom/ajax';
import { zip } from 'rxjs/observable/zip';
import { of } from 'rxjs/observable/of';
import {
  LOAD_REPOSITORY_DETAILS_REQUEST,
  LoadRepositoryDeatilsRequestAction,
  loadRepositoryDeatilsSuccess,
  loadRepositoryDeatilsFailure
} from '../actions';
import { BASE_URL } from '../../constants';

export function loadRepositoryDetailsEpic(action$: Observable<Action>, store: Store, { history }: { history: History }) {
  return action$.pipe(
    ofType(LOAD_REPOSITORY_DETAILS_REQUEST),
    map((action: LoadRepositoryDeatilsRequestAction) => action.payload),
    exhaustMap(({ repositoryId }) => {
      return zip(
        ajax.getJSON(`${BASE_URL}/repositories/${repositoryId}`),
        (repository) => ({ repository })
      ).pipe(
        map((res) => loadRepositoryDeatilsSuccess(res)),
        catchError((err) => of(loadRepositoryDeatilsFailure(err)))
      );
    })
  );
}