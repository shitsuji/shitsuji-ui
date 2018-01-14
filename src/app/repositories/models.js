// @flow
import { Record } from '../models';

export interface RepositoryCreateData {
  name: string;
  url: string;
}

export interface Repository extends RepositoryCreateData, Record {
  createdAt: Date;
}

export interface RepositoriesState {
  repositories: ?Repository[];
  pending: boolean;
}

export interface RepositoryDetailsState {
  repository: ?Repository;
  pending: boolean;
}