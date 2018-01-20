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
import { exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import { APPLICATIONS_PATH } from '../constants';
import { getRidAsId } from '../../helpers';
import { Dependencies } from '../../models';

export function editVersionEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(EDIT_VERSION_REQUEST),
    map((action: EditVersionRequestAction) => action.payload),
    exhaustMap(async ({ applicationId, version }) => {
      try {
        const res = await axios.patch(`/versions/${getRidAsId((version))}`, version);

        return editVersionSuccess({ applicationId, version: res.data });
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
