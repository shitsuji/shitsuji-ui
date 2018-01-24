// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import {
  LOAD_USERS_REQUEST,
  LoadUsersRequestAction,
  loadUsersSuccess,
  loadUsersFailure,
  CREATE_USER_REQUEST,
  CreateUserRequestAction,
  createUserSuccess,
  createUserFailure,
  DELETE_USER_REQUEST,
  DeleteUserRequestAction,
  deleteUserSuccess,
  deleteUserFailure,
  CREATE_USER_SUCCESS,
  DELETE_USER_SUCCESS
} from '../actions';
import { exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import { USERS_PATH } from '../constants';
import queryString from 'query-string';
import { Dependencies } from '../../models';

export function loadUsersEpic(action$: Observable<Action>, store: Store, { history, axios }: Dependencies) {
  return action$.pipe(
    ofType(LOAD_USERS_REQUEST),
    map((action: LoadUsersRequestAction) => action.payload),
    exhaustMap(async ({ search }) => {
      const current = queryString.parse(history.location.search);
      let params;

      if ((search && search.length)) {
        history.push({
          search: queryString.stringify({ search })
        });

        params = { search };
      } else if (current.search) {
        history.push({});
      }

      try {
        const res = await axios.get('/users', { params });
        
        return loadUsersSuccess(res.data);
      } catch (e) {
        return loadUsersFailure(e);
      }
    })
  );
}

export function createUserEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(CREATE_USER_REQUEST),
    map((action: CreateUserRequestAction) => action.payload),
    exhaustMap(async (payload) => {
      try {
        const res = await axios.post('/users', payload);

        return createUserSuccess(res.data);
      } catch (e) {
        return createUserFailure(e);
      }
    })
  );
}

export function deleteUserEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(DELETE_USER_REQUEST),
    map((action: DeleteUserRequestAction) => action.payload),
    exhaustMap(async ({ userId }) => {
      try {
        await axios.delete(`/users/${userId}`);

        return deleteUserSuccess({ userId });
      } catch (e) {
        return deleteUserFailure(e);
      }
    })
  );
}

export function navigateToUsersOnSuccessEpic(action$: Observable<Action>, store: Store, { history }: Dependencies) {
  return action$.pipe(
    ofType(CREATE_USER_SUCCESS, DELETE_USER_SUCCESS),
    tap(() => {
      history.push(USERS_PATH);
    }),
    ignoreElements()
  );
}
