// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import { exhaustMap, map } from 'rxjs/operators';
import {
  LOAD_APPLICATION_DETAILS_REQUEST,
  LoadApplicationDeatilsRequestAction,
  loadApplicationDeatilsSuccess,
  loadApplicationDeatilsFailure
} from '../actions';
import { Dependencies } from '../../models';

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