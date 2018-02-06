// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import { exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import {
  LOAD_APPLICATION_DETAILS_REQUEST,
  LoadApplicationDeatilsRequestAction,
  loadApplicationDeatilsSuccess,
  loadApplicationDeatilsFailure,
  SELECT_VERSION_REQUEST,
  SelectVersionRequestAction,
  selectVersionSuccess,
  selectVersionFailure,
  SELECT_VERSION_FAILURE
} from '../actions';
import { Dependencies } from '../../models';
import { getRidAsId, showError } from '../../helpers';

export function loadApplicationDetailsEpic(action$: Observable<Action>, store: Store, { history, axios }: Dependencies) {
  return action$.pipe(
    ofType(LOAD_APPLICATION_DETAILS_REQUEST),
    map((action: LoadApplicationDeatilsRequestAction) => action.payload),
    exhaustMap(async ({ applicationId }) => {
      try {
        const [ application, versions ] = await Promise.all([
          axios.get(`/applications/${applicationId}`),
          axios.get(`/applications/${applicationId}/versions`)
        ]);

        return loadApplicationDeatilsSuccess({
          application: application.data,
          versions: versions.data
        });
      } catch (e) {
        return loadApplicationDeatilsFailure(e);
      }
    })
  );
}

export function selectVersionEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(SELECT_VERSION_REQUEST),
    map((action: SelectVersionRequestAction) => action.payload),
    exhaustMap(async (version) => {
      try {
        const versionId = getRidAsId(version);

        const [ dependees, dependers ] = await Promise.all([
          axios.get(`/versions/${versionId}/dependees`),
          axios.get(`/versions/${versionId}/dependers`)
        ]);

        return selectVersionSuccess({
          dependees: dependees.data,
          dependers: dependers.data
        });
      } catch (e) {
        return selectVersionFailure(e);
      }
    })
  );
}

export function selectVersionToastEpic(action$: Observable<Action>, store: Store) {
  return action$.pipe(
    ofType(SELECT_VERSION_FAILURE),
    tap(() => showError('Error while downloading dependees and dependers')),
    ignoreElements()
  );
}