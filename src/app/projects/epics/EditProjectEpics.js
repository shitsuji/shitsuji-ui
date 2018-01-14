// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import {
  EDIT_PROJECT_REQUEST,
  EDIT_PROJECT_SUCCESS,
  EditProjectRequestAction,
  EditProjectSuccessAction,
  editProjectSuccess,
  editProjectFailure
} from '../actions';
import { catchError, exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import { ajax } from 'rxjs/observable/dom/ajax';
import { of } from 'rxjs/observable/of';
import { BASE_URL } from '../../constants';
import { PROJECTS_PATH } from '../constants';
import { History } from 'history';
import { getRidAsId } from '../../helpers';

export function editProjectEpic(action$: Observable<Action>, store: Store, deps: {}) {
  return action$.pipe(
    ofType(EDIT_PROJECT_REQUEST),
    map((action: EditProjectRequestAction) => action.payload),
    exhaustMap((payload) => ajax.patch(`${BASE_URL}/projects/${getRidAsId((payload))}`, payload).pipe(
      map((res) => editProjectSuccess(res.response)),
      catchError((err) => of(editProjectFailure(err)))
    ))
  );
}

export function navigateToProjectsOnEditEpic(action$: Observable<Action>, store: Store, { history }: { history: History }) {
  return action$.pipe(
    ofType(EDIT_PROJECT_SUCCESS),
    map((action: EditProjectSuccessAction) => action.payload),
    tap((project) => {
      history.push(`${PROJECTS_PATH}/${getRidAsId(project)}`);
    }),
    ignoreElements()
  );
}
