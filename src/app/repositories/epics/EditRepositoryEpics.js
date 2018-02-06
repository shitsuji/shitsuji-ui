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
  editRepositoryFailure,
  EDIT_REPOSITORY_FAILURE
} from '../actions';
import { exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import { REPOSITORIES_PATH } from '../constants';
import { getRidAsId, showError } from '../../helpers';
import { Dependencies } from '../../models';

export function editRepositoryEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(EDIT_REPOSITORY_REQUEST),
    map((action: EditRepositoryRequestAction) => action.payload),
    exhaustMap(async (payload) => {
      try {
        const res = await axios.patch(`/repositories/${getRidAsId((payload))}`, payload);

        return editRepositorySuccess(res.data);
      } catch (e) {
        return editRepositoryFailure(e);
      }
    })
  );
}

export function navigateToRepositoriesOnEditEpic(action$: Observable<Action>, store: Store, { history }: Dependencies) {
  return action$.pipe(
    ofType(EDIT_REPOSITORY_SUCCESS),
    map((action: EditRepositorySuccessAction) => action.payload),
    tap((repository) => {
      history.push(`${REPOSITORIES_PATH}/${getRidAsId(repository)}`);
    }),
    ignoreElements()
  );
}

export function editRepositoryToastEpic(action$: Observable<Action>, store: Store) {
  return action$.pipe(
    ofType(EDIT_REPOSITORY_FAILURE),
    tap(() => showError('Error while updating repository')),
    ignoreElements()
  );
}