// @flow
import { RepositoriesState, RepositoryDetailsState } from './models';

export const REPOSITORIES_PATH = '/repositories';
export const CREATE_REPOSITORY_PATH = `${REPOSITORIES_PATH}/create`;

export const REPOSITORIES_INITIAL_STATE: RepositoriesState = {
  pending: true,
  repositories: null
};

export const REPOSITORY_DETAILS_INITIAL_STATE: RepositoryDetailsState = {
  pending: true,
  repository: null
};
