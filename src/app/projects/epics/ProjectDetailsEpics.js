// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import { exhaustMap, map } from 'rxjs/operators';
import {
  LOAD_PROJECT_DETAILS_REQUEST,
  LoadProjectDeatilsRequestAction,
  loadProjectDeatilsSuccess,
  loadProjectDeatilsFailure
} from '../actions';
import { Dependencies } from '../../models';

export function loadProjectDetailsEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(LOAD_PROJECT_DETAILS_REQUEST),
    map((action: LoadProjectDeatilsRequestAction) => action.payload),
    exhaustMap(async ({ projectId }) => {
      try {
        const [project, applications] = await Promise.all([
          axios.get(`/projects/${projectId}`),
          axios.get(`/projects/${projectId}/applications`)
        ]);

        return loadProjectDeatilsSuccess({
          project: project.data,
          applications: applications.data
        });
      } catch (e) {
        return loadProjectDeatilsFailure(e);
      }
    })
  );
}