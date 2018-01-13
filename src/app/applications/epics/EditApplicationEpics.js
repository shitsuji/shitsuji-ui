// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import {
  EDIT_APPLICATION_REQUEST,
  EDIT_APPLICATION_SUCCESS,
  EditApplicationRequestAction,
  EditApplicationSuccessAction,
  editApplicationSuccess,
  editApplicationFailure
} from '../actions';
import { catchError, exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import { ajax } from 'rxjs/observable/dom/ajax';
import { of } from 'rxjs/observable/of';
import { BASE_URL } from '../../constants';
import { APPLICATIONS_PATH } from '../constants';
import { History } from 'history';
import { getRidAsId } from '../../helpers';

export function editApplicationEpic(action$: Observable<Action>, store: Store, deps: {}) {
  return action$.pipe(
    ofType(EDIT_APPLICATION_REQUEST),
    map((action: EditApplicationRequestAction) => action.payload),
    exhaustMap((payload) => ajax.patch(`${BASE_URL}/applications/${getRidAsId((payload))}`, payload).pipe(
      map((res) => editApplicationSuccess(res.response)),
      catchError((err) => of(editApplicationFailure(err)))
    ))
  );
}

export function navigateToApplicationsOnEditEpic(action$: Observable<Action>, store: Store, { history }: { history: History }) {
  return action$.pipe(
    ofType(EDIT_APPLICATION_SUCCESS),
    map((action: EditApplicationSuccessAction) => action.payload),
    tap((application) => {
      history.push(`${APPLICATIONS_PATH}/${getRidAsId(application)}`);
    }),
    ignoreElements()
  );
}
