// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import {
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EditUserRequestAction,
  EditUserSuccessAction,
  editUserSuccess,
  editUserFailure
} from '../actions';
import { exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import { USERS_PATH } from '../constants';
import { getRidAsId } from '../../helpers';
import { Dependencies } from '../../models';

export function editUserEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(EDIT_USER_REQUEST),
    map((action: EditUserRequestAction) => action.payload),
    exhaustMap(async (payload) => {
      try {
        const res = await axios.patch(`/users/${getRidAsId((payload))}`, payload);
        
        return editUserSuccess(res.data);
      } catch (e) {
        return editUserFailure(e);
      }
    })
  );
}

export function navigateToUsersOnEditEpic(action$: Observable<Action>, store: Store, { history }: Dependencies) {
  return action$.pipe(
    ofType(EDIT_USER_SUCCESS),
    map((action: EditUserSuccessAction) => action.payload),
    tap((user) => {
      history.push(`${USERS_PATH}/${getRidAsId(user)}`);
    }),
    ignoreElements()
  );
}
