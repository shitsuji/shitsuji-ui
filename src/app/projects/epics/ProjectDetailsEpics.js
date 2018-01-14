// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ajax } from 'rxjs/observable/dom/ajax';
import { zip } from 'rxjs/observable/zip';
import { of } from 'rxjs/observable/of';
import {
  LOAD_PROJECT_DETAILS_REQUEST,
  LoadProjectDeatilsRequestAction,
  loadProjectDeatilsSuccess,
  loadProjectDeatilsFailure
} from '../actions';
import { BASE_URL } from '../../constants';

export function loadProjectDetailsEpic(action$: Observable<Action>, store: Store, { history }: { history: History }) {
  return action$.pipe(
    ofType(LOAD_PROJECT_DETAILS_REQUEST),
    map((action: LoadProjectDeatilsRequestAction) => action.payload),
    exhaustMap(({ projectId }) => {
      return zip(
        ajax.getJSON(`${BASE_URL}/projects/${projectId}`),
        (project) => ({ project })
      ).pipe(
        map((res) => loadProjectDeatilsSuccess(res)),
        catchError((err) => of(loadProjectDeatilsFailure(err)))
      );
    })
  );
}