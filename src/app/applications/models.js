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

export interface ApplicationsState {
  applications: Application[];
  pending: boolean;
}