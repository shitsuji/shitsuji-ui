// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import {
  LOAD_PROJECTS_REQUEST,
  LoadProjectsRequestAction,
  loadProjectsSuccess,
  loadProjectsFailure,
  CREATE_PROJECT_REQUEST,
  CreateProjectRequestAction,
  createProjectSuccess,
  createProjectFailure,
  DELETE_PROJECT_REQUEST,
  DeleteProjectRequestAction,
  deleteProjectSuccess,
  deleteProjectFailure,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_SUCCESS
} from '../actions';
import { exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import { PROJECTS_PATH } from '../constants';
import queryString from 'query-string';
import { Dependencies } from '../../models';
import { getRidAsId } from '../../helpers';

export function loadProjectsEpic(action$: Observable<Action>, store: Store, { history, axios }: Dependencies) {
  return action$.pipe(
    ofType(LOAD_PROJECTS_REQUEST),
    map((action: LoadProjectsRequestAction) => action.payload),
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
        const res = await axios.get('/projects', { params });
        
        return loadProjectsSuccess(res.data);
      } catch (e) {
        return loadProjectsFailure(e);
      }
    })
  );
}

export function createProjectEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(CREATE_PROJECT_REQUEST),
    map((action: CreateProjectRequestAction) => action.payload),
    exhaustMap(async ({ project, selectedApplications }) => {
      try {
        const res = await axios.post('/projects', project);
        await axios.put(`/projects/${getRidAsId((res.data))}/applications`, selectedApplications);
        
        return createProjectSuccess(res.data);
      } catch (e) {
        return createProjectFailure(e);
      }
    })
  );
}

export function deleteProjectEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(DELETE_PROJECT_REQUEST),
    map((action: DeleteProjectRequestAction) => action.payload),
    exhaustMap(async ({ projectId }) => {
      try {
        await axios.delete(`/projects/${projectId}`);

        return deleteProjectSuccess({ projectId });
      } catch (e) {
        return deleteProjectFailure(e);
      }
    })
  );
}

export function navigateToProjectsOnSuccessEpic(action$: Observable<Action>, store: Store, { history }: Dependencies) {
  return action$.pipe(
    ofType(CREATE_PROJECT_SUCCESS, DELETE_PROJECT_SUCCESS),
    tap(() => {
      history.push(PROJECTS_PATH);
    }),
    ignoreElements()
  );
}
