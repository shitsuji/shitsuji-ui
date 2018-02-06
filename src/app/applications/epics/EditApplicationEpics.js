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
  editApplicationFailure,
  EDIT_APPLICATION_FAILURE
} from '../actions';
import { exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import { APPLICATIONS_PATH } from '../constants';
import { getRidAsId, showError } from '../../helpers';
import { Dependencies } from '../../models';

export function editApplicationEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(EDIT_APPLICATION_REQUEST),
    map((action: EditApplicationRequestAction) => action.payload),
    exhaustMap(async (payload) => {
      try {
        const res = await axios.patch(`/applications/${getRidAsId((payload))}`, payload);

        return editApplicationSuccess(res.data);
      } catch (e) {
        return editApplicationFailure(e);
      }
    })
  );
}

export function navigateToApplicationsOnEditEpic(action$: Observable<Action>, store: Store, { history }: Dependencies) {
  return action$.pipe(
    ofType(EDIT_APPLICATION_SUCCESS),
    map((action: EditApplicationSuccessAction) => action.payload),
    tap((application) => {
      history.push(`${APPLICATIONS_PATH}/${getRidAsId(application)}`);
    }),
    ignoreElements()
  );
}

export function editApplicationToastEpic(action$: Observable<Action>, store: Store) {
  return action$.pipe(
    ofType(EDIT_APPLICATION_FAILURE),
    tap(() => showError('Error while updating application')),
    ignoreElements()
  );
}