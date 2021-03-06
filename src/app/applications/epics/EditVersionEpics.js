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
  editVersionFailure,
  EDIT_VERSION_FAILURE
} from '../actions';
import { exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import { APPLICATIONS_PATH } from '../constants';
import { getRidAsId, showError } from '../../helpers';
import { Dependencies } from '../../models';

export function editVersionEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(EDIT_VERSION_REQUEST),
    map((action: EditVersionRequestAction) => action.payload),
    exhaustMap(async ({ applicationId, version, dependencies }) => {
      const versionId = getRidAsId((version));

      try {
        const [ res, dependees ] = await Promise.all([
          axios.patch(`/versions/${versionId}`, version),
          axios.put(`/versions/${versionId}/dependees`, dependencies)
        ]);

        return editVersionSuccess({ applicationId, version: res.data, dependees: dependees.data });
      } catch (e) {
        return editVersionFailure(e);
      }
    })
  );
}

export function navigateToVersionsOnEditEpic(action$: Observable<Action>, store: Store, { history }: Dependencies) {
  return action$.pipe(
    ofType(EDIT_VERSION_SUCCESS),
    map((action: EditVersionSuccessAction) => action.payload),
    tap(({ applicationId }) => {
      history.push(`${APPLICATIONS_PATH}/${applicationId}`);
    }),
    ignoreElements()
  );
}

export function editVersionToastEpic(action$: Observable<Action>, store: Store) {
  return action$.pipe(
    ofType(EDIT_VERSION_FAILURE),
    tap(() => showError('Error while updating version')),
    ignoreElements()
  );
}