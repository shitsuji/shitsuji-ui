// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import {
  EDIT_VERSION_REQUEST,
  EDIT_VERSION_SUCCESS,
  EditVersionRequestAction,
  EditVersionSuccessAction,
  editVersionSuccess,
  editVersionFailure
} from '../actions';
import { catchError, exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import { ajax } from 'rxjs/observable/dom/ajax';
import { of } from 'rxjs/observable/of';
import { BASE_URL } from '../../constants';
import { APPLICATIONS_PATH } from '../constants';
import { History } from 'history';
import { getRidAsId } from '../../helpers';

export function editVersionEpic(action$: Observable<Action>, store: Store, deps: {}) {
  return action$.pipe(
    ofType(EDIT_VERSION_REQUEST),
    map((action: EditVersionRequestAction) => action.payload),
    exhaustMap(({ applicationId, version }) => ajax.patch(`${BASE_URL}/versions/${getRidAsId((version))}`, version).pipe(
      map((res) => editVersionSuccess({ applicationId, version: res.response })),
      catchError((err) => of(editVersionFailure(err)))
    ))
  );
}

export function navigateToVersionsOnEditEpic(action$: Observable<Action>, store: Store, { history }: { history: History }) {
  return action$.pipe(
    ofType(EDIT_VERSION_SUCCESS),
    map((action: EditVersionSuccessAction) => action.payload),
    tap(({ applicationId }) => {
      history.push(`${APPLICATIONS_PATH}/${applicationId}`);
    }),
    ignoreElements()
  );
}
