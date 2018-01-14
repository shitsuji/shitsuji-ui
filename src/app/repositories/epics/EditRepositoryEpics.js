// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import {
  EDIT_REPOSITORY_REQUEST,
  EDIT_REPOSITORY_SUCCESS,
  EditRepositoryRequestAction,
  EditRepositorySuccessAction,
  editRepositorySuccess,
  editRepositoryFailure
} from '../actions';
import { catchError, exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import { ajax } from 'rxjs/observable/dom/ajax';
import { of } from 'rxjs/observable/of';
import { BASE_URL } from '../../constants';
import { REPOSITORIES_PATH } from '../constants';
import { History } from 'history';
import { getRidAsId } from '../../helpers';

export function editRepositoryEpic(action$: Observable<Action>, store: Store, deps: {}) {
  return action$.pipe(
    ofType(EDIT_REPOSITORY_REQUEST),
    map((action: EditRepositoryRequestAction) => action.payload),
    exhaustMap((payload) => ajax.patch(`${BASE_URL}/repositories/${getRidAsId((payload))}`, payload).pipe(
      map((res) => editRepositorySuccess(res.response)),
      catchError((err) => of(editRepositoryFailure(err)))
    ))
  );
}

export function navigateToRepositoriesOnEditEpic(action$: Observable<Action>, store: Store, { history }: { history: History }) {
  return action$.pipe(
    ofType(EDIT_REPOSITORY_SUCCESS),
    map((action: EditRepositorySuccessAction) => action.payload),
    tap((repository) => {
      history.push(`${REPOSITORIES_PATH}/${getRidAsId(repository)}`);
    }),
    ignoreElements()
  );
}
