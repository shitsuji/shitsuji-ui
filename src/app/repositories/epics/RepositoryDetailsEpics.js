// @flow
import { Observable } from 'rxjs/Observable';
import { Action, Store } from 'redux';
import { ofType } from 'redux-observable';
import { exhaustMap, map } from 'rxjs/operators';
import {
  LOAD_REPOSITORY_DETAILS_REQUEST,
  LoadRepositoryDeatilsRequestAction,
  loadRepositoryDeatilsSuccess,
  loadRepositoryDeatilsFailure,
  INITIALIZE_REPOSITORY_REQUEST,
  InitializeRepositoryRequestAction,
  initializeRepositorySuccess,
  initializeRepositoryFailure
} from '../actions';
import { Dependencies } from '../../models';

export function loadRepositoryDetailsEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(LOAD_REPOSITORY_DETAILS_REQUEST),
    map((action: LoadRepositoryDeatilsRequestAction) => action.payload),
    exhaustMap(async ({ repositoryId }) => {
      try {
        const [repository, applications] = await Promise.all([
          axios.get(`/repositories/${repositoryId}`),
          axios.get(`/repositories/${repositoryId}/applications`)
        ]);

        return loadRepositoryDeatilsSuccess({
          repository: repository.data,
          applications: applications.data
        });
      } catch (e) {
        return loadRepositoryDeatilsFailure(e);
      }
    })
  );
}

export function initializeRepositoryEpic(action$: Observable<Action>, store: Store, { axios }: Dependencies) {
  return action$.pipe(
    ofType(INITIALIZE_REPOSITORY_REQUEST),
    map((action: InitializeRepositoryRequestAction) => action.payload),
    exhaustMap(async ({ repositoryId }) => {
      try {
        const res = await axios.post(`/repositories/${repositoryId}/initialize`, {});

        return initializeRepositorySuccess(res.data);
      } catch (e) {
        return initializeRepositoryFailure(e);
      }
    })
  );
}