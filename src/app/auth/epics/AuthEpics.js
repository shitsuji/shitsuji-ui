// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import {
  LOGIN_REQUEST,
  LoginRequestAction,
  loginSuccess,
  loginFailure,
  TOKEN_REQUEST,
  TokenRequestAction,
  tokenSuccess,
  tokenFailure,
  TOKEN_SUCCESS,
  LOGIN_SUCCESS,
  TokenSuccessAction,
  LoginSuccessAction,
  TOKEN_FAILURE,
  LOGIN_FAILURE,
  LOGOUT_REQUEST
} from '../actions';
import { catchError, exhaustMap, map, ignoreElements, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/observable/dom/ajax';
import { of } from 'rxjs/observable/of';
import { BASE_URL } from '../../constants';
import { History } from 'history';
import { TOKEN_KEY } from '../index';

export function loginEpic(action$: Observable<Action>, store: Store, { history }: { history: History }) {
  return action$.pipe(
    ofType(LOGIN_REQUEST),
    map((action: LoginRequestAction) => action.payload),
    exhaustMap((payload) => ajax.post(`${BASE_URL}/auth/login`, payload).pipe(
      map((res) => loginSuccess(res.response)),
      catchError((err) => of(loginFailure(err)))
    ))
  );
}

export function tokenEpic(action$: Observable<Action>, store: Store, { history }: { history: History }) {
  return action$.pipe(
    ofType(TOKEN_REQUEST),
    map((action: TokenRequestAction) => action.payload),
    exhaustMap((payload) => ajax.post(`${BASE_URL}/auth/token`, payload, {
      Authorization: `Bearer ${payload.token}`
    }).pipe(
      map((res) => tokenSuccess(res.response)),
      catchError((err) => of(tokenFailure(err)))
    ))
  );
}

export function setTokenEpic(action$: Observable<Action>, store: Store) {
  return action$.pipe(
    ofType(TOKEN_SUCCESS, LOGIN_SUCCESS),
    map((action: TokenSuccessAction | LoginSuccessAction) => action.payload),
    tap(({ token }) => {
      localStorage.setItem(TOKEN_KEY, token);
    }),
    ignoreElements()
  );
}

export function removeTokenEpic(action$: Observable<Action>, store: Store) {
  return action$.pipe(
    ofType(TOKEN_FAILURE, LOGIN_FAILURE, LOGOUT_REQUEST),
    tap(() => {
      localStorage.removeItem(TOKEN_KEY);
    }),
    ignoreElements()
  );
}
