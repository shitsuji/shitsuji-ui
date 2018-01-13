// @flow
import { Record } from '../models';

export interface ApplicationCreateData {
  name: string;
  key: string;
}

export interface VersionCreateData {
  number: string;
}

export interface Application extends ApplicationCreateData, Record {
  createdAt: Date;
  isGenerated: boolean;
  isLegacy: boolean;
  repository: any;
}

export interface Commit {
  author: string;
  createdAt: Date;
  message: string;
  hash: string;
}

export interface Version extends VersionCreateData, Record {
  createdAt: Date;
  commit?: Commit;
}

export interface ApplicationsState {
  applications: ?Application[];
  pending: boolean;
}

export interface ApplicationDetailsState {
  application: ?Application;
  pending: boolean;
  versions: ?Version[];
  selectedVersionId: ?string;
}