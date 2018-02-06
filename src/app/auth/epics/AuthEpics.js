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
  TOKEN_FAILURE,
  LOGIN_FAILURE,
  LOGOUT_REQUEST
} from '../actions';
import { exhaustMap, map, ignoreElements, tap } from 'rxjs/operators';
import { TOKEN_KEY } from '../constants';
import { Dependencies } from '../../models';
import { showError } from '../../helpers';

function setToken(token, axios) {
  localStorage.setItem(TOKEN_KEY, token);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function loginEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(LOGIN_REQUEST),
    map((action: LoginRequestAction) => action.payload),
    exhaustMap(async (payload) => {
      try {
        const res = await axios.post('/auth/login', payload);

        setToken(res.data.token, axios);
        return loginSuccess(res.data);
      } catch (e) {
        return loginFailure(e);
      }
    })
  );
}

export function tokenEpic(action$: Observable<Action>, store: Store, { history, axios }: Dependencies) {
  return action$.pipe(
    ofType(TOKEN_REQUEST),
    map((action: TokenRequestAction) => action.payload),
    exhaustMap(async (payload) => {
      const headers = {
        Authorization: `Bearer ${payload.token}`
      };
      
      try {
        const res = await axios.post('/auth/token', payload, { headers });

        setToken(res.data.token, axios);
        return tokenSuccess(res.data);
      } catch (e) {
        return tokenFailure(e);
      }
    })
  );
}

export function removeTokenEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(TOKEN_FAILURE, LOGIN_FAILURE, LOGOUT_REQUEST),
    tap(() => {
      localStorage.removeItem(TOKEN_KEY);
      delete axios.defaults.headers.common.Authorization;
    }),
    ignoreElements()
  );
}

export function authToastEpic(action$: Observable<Action>, store: Store) {
  return action$.pipe(
    ofType(LOGIN_FAILURE),
    tap(() => showError('Invalid login or password')),
    ignoreElements()
  );
}