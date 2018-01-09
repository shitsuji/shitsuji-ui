// @flow

export interface ApplicationCreateData {
  name: string;
  key: string;
}

export interface Application extends ApplicationCreateData {
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

export interface Version {
  number: string;
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
}