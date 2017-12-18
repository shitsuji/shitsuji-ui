// @flow

export interface Application {
  createdAt: Date;
  name: string;
  key: string;
  isGenerated: boolean;
  isLegacy: boolean;
  repository: any;
}

export interface ApplicationsState {
  applications: Application[];
  pending: boolean;
}