// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ajax } from 'rxjs/observable/dom/ajax';
import { zip } from 'rxjs/observable/zip';
import { of } from 'rxjs/observable/of';
import {
  LOAD_APPLICATION_DETAILS_REQUEST,
  LoadApplicationDeatilsRequestAction,
  loadApplicationDeatilsSuccess,
  loadApplicationDeatilsFailure
} from '../actions';
import { BASE_URL } from '../../constants';

export function loadApplicationDetailsEpic(action$: Observable<Action>, store: Store, { history }: { history: History }) {
  return action$.pipe(
    ofType(LOAD_APPLICATION_DETAILS_REQUEST),
    map((action: LoadApplicationDeatilsRequestAction) => action.payload),
    exhaustMap(({ applicationId }) => {
      return zip(
        ajax.getJSON(`${BASE_URL}/applications/${applicationId}`),
        ajax.getJSON(`${BASE_URL}/applications/${applicationId}/versions`),
        (application, versions) => ({ application, versions })
      ).pipe(
        map((res) => loadApplicationDeatilsSuccess(res)),
        catchError((err) => of(loadApplicationDeatilsFailure(err)))
      );
    })
  );
}