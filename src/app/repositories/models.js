// @flow
import { Record } from '../models';
import { Application } from '../applications';

export interface RepositoryCreateData {
  name: string;
  url: string;
  branch: string;
}

export interface Repository extends RepositoryCreateData, Record {
  createdAt: Date;
  publicKey: string;
}

export interface RepositoriesState {
  repositories: ?Repository[];
  pending: boolean;
}

export interface RepositoryDetailsState {
  repository: ?Repository;
  applications: ?Application[];
  pending: boolean;
}