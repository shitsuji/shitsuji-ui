// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import {
  LOAD_APPLICATIONS_REQUEST,
  LoadApplicationsRequestAction,
  loadApplicationsSuccess,
  loadApplicationsFailure,
  CREATE_APPLICATION_REQUEST,
  CreateApplicationRequestAction,
  createApplicationSuccess,
  createApplicationFailure,
  CREATE_APPLICATION_SUCCESS,
  DELETE_APPLICATION_SUCCESS,
  DELETE_APPLICATION_REQUEST,
  deleteApplicationFailure,
  deleteApplicationSuccess,
  DeleteApplicationRequestAction,
  CREATE_APPLICATION_FAILURE,
  DELETE_APPLICATION_FAILURE
} from '../actions';
import { exhaustMap, map, tap, ignoreElements } from 'rxjs/operators';
import { APPLICATIONS_PATH } from '../constants';
import { History } from 'history';
import queryString from 'query-string';
import { Dependencies } from '../../models';
import { LOAD_PROJECT_DETAILS_REQUEST } from '../../projects';
import { showError } from '../../helpers';

export function loadApplicationsEpic(action$: Observable<Action>, store: Store, { history, axios }: Dependencies) {
  return action$.pipe(
    ofType(LOAD_APPLICATIONS_REQUEST, LOAD_PROJECT_DETAILS_REQUEST),
    map((action: LoadApplicationsRequestAction) => action.payload),
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
        const res = await axios.get('/applications', { params });

        return loadApplicationsSuccess(res.data);
      } catch (e) {
        return loadApplicationsFailure(e);
      }
    })
  );
}

export function createApplicationEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(CREATE_APPLICATION_REQUEST),
    map((action: CreateApplicationRequestAction) => action.payload),
    exhaustMap(async (payload) => {
      try {
        const res = await axios.post('/applications', payload);

        return createApplicationSuccess(res.data);
      } catch (e) {
        return createApplicationFailure(e);
      }
    })
  );
}

export function deleteApplicationEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(DELETE_APPLICATION_REQUEST),
    map((action: DeleteApplicationRequestAction) => action.payload),
    exhaustMap(async ({ applicationId }) => {
      try {
        await axios.delete(`/applications/${applicationId}`);
  
        return deleteApplicationSuccess({ applicationId });
      } catch (e) {
        return deleteApplicationFailure(e);
      }
    })
  );
}

export function navigateToApplicationsOnSuccessEpic(action$: Observable<Action>, store: Store, { history }: { history: History }) {
  return action$.pipe(
    ofType(CREATE_APPLICATION_SUCCESS, DELETE_APPLICATION_SUCCESS),
    tap(() => {
      history.push(APPLICATIONS_PATH);
    }),
    ignoreElements()
  );
}

export function createApplicationToastEpic(action$: Observable<Action>, store: Store) {
  return action$.pipe(
    ofType(CREATE_APPLICATION_FAILURE),
    tap(() => showError('Error while creating application')),
    ignoreElements()
  );
}

export function deleteApplicationToastEpic(action$: Observable<Action>, store: Store) {
  return action$.pipe(
    ofType(DELETE_APPLICATION_FAILURE),
    tap(() => showError('Error while deleting application')),
    ignoreElements()
  );
}