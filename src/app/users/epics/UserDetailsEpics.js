// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import { exhaustMap, map } from 'rxjs/operators';
import {
  LOAD_USER_DETAILS_REQUEST,
  LoadUserDeatilsRequestAction,
  loadUserDeatilsSuccess,
  loadUserDeatilsFailure
} from '../actions';
import { Dependencies } from '../../models';

export function loadUserDetailsEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(LOAD_USER_DETAILS_REQUEST),
    map((action: LoadUserDeatilsRequestAction) => action.payload),
    exhaustMap(async ({ userId }) => {
      try {
        const res = await axios.get(`/users/${userId}`);

        return loadUserDeatilsSuccess({
          user: res.data
        });
      } catch (e) {
        return loadUserDeatilsFailure(e);
      }
    })
  );
}