// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import {
  EDIT_PROJECT_REQUEST,
  EDIT_PROJECT_SUCCESS,
  EditProjectRequestAction,
  EditProjectSuccessAction,
  editProjectSuccess,
  editProjectFailure,
  EDIT_PROJECT_FAILURE
} from '../actions';
import { exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import { PROJECTS_PATH } from '../constants';
import { getRidAsId, showError } from '../../helpers';
import { Dependencies } from '../../models';

export function editProjectEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(EDIT_PROJECT_REQUEST),
    map((action: EditProjectRequestAction) => action.payload),
    exhaustMap(async ({ project, selectedApplications }) => {
      try {
        const [res, applications] = await Promise.all([
          axios.patch(`/projects/${getRidAsId((project))}`, project),
          axios.put(`/projects/${getRidAsId((project))}/applications`, selectedApplications),
        ]);
        
        return editProjectSuccess({
          project: res.data,
          applications: applications.data
        });
      } catch (e) {
        return editProjectFailure(e);
      }
    })
  );
}

export function navigateToProjectsOnEditEpic(action$: Observable<Action>, store: Store, { history }: Dependencies) {
  return action$.pipe(
    ofType(EDIT_PROJECT_SUCCESS),
    map((action: EditProjectSuccessAction) => action.payload),
    tap(({ project }) => {
      history.push(`${PROJECTS_PATH}/${getRidAsId(project)}`);
    }),
    ignoreElements()
  );
}

export function editProjectToastEpic(action$: Observable<Action>, store: Store) {
  return action$.pipe(
    ofType(EDIT_PROJECT_FAILURE),
    tap(() => showError('Error while updating project')),
    ignoreElements()
  );
}